<!---->

<!---->

<!---->

<!---->

### 最近发现解决 el-input 自动填充密码问题，解决方式主要有：

1\. 都是设置 autocomplete 属性；

```
 <el-input type="password"
	    v-model="passwordForm.checkPass"
	    auto-complete="new-password"
	    >
```

2\. 通过添加 readonly＆onfocus =“this.removeAttribute（'readonly'）;

```
<input type="password" name="Password" autocomplete="off" readonly 
onfocus="this.removeAttribute('readonly');" >
```

**以上两种方法，在 Chrome 版本 87.0.4280.141, 不关闭浏览器的密码提示密码功能和自动登录的功能（如下图），亲自尝试，都不管用** ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84996869de5349ccb3adb0e3bb24cdae~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 最终找到了如下方式解决问题，亲试有效：

````
<el-form-item label="用户名" prop="user_name">
        <el-input v-model="info.user_name" :disabled="updateFlag" auto-complete="off" name="person.user.user_name"></el-input>
      </el-form-item>
      <el-form-item label="厂商" prop="factory">
        <el-input v-model="info.factory" auto-complete="off" name="person.user.factory"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="info.password" :type="((newPwdReadOnly && info.password) || info.password)?'password':'text'" auto-complete="new-password" name="person.user.new_password" @focus="newPwdFocus($event)" :readonly="newPwdReadOnly" @blur="newPwdBlur($event)" ref="newPwdRef"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPwd">
        <el-input v-model="info.confirmPwd" :type="((rePwdReadOnly && info.confirmPwd) || info.confirmPwd)?'password':'text'" auto-complete="confirm-password" name="person.user.re_password" @focus="newPwdFocus($event, false)" :readonly="rePwdReadOnly" @blur="newPwdBlur($event, false)" ref="reNewPwdRef"></el-input>
      </el-form-item>
      ```
给各输入项加了auto-complete属性，只能避免保存的时候弹出是否保存密码弹框的问题。
内容为空的时候点击type="password"的input框或二次（多次）点击，还是会弹出密码框，所以在上面加了type在password和text之间切换（只能解决第一次多次点击的场景）。
具体解决，给type="password"的输入项增加focus,blur事件和readonly属性，具体focus, blur方法：
````

newPwdFocus (evt, isNew = true) { if (evt) { evt.stopPropagation (); evt.preventDefault (); } setTimeout (() => { if (isNew) { this.newPwdReadOnly = false; } else { this.rePwdReadOnly = false; } }, 100); }, newPwdBlur (evt, isNew = true) { if (evt) { evt.stopPropagation (); } if (isNew) { this.newPwdReadOnly = true; } else { this.rePwdReadOnly = true; } }, \`\`\` 关键在于 setTimeout 0 的延时。 以上还不算完全解决，输入内容，再回车删除内容，发现自动填充框又出来了，所以需要 watch 以下：

```
 watch: {
    "info.password": function () {
      if (this.info.password === "") {
        this.newPwdReadOnly = true;
        this.newPwdFocus(null);
      }
    },
    "info.confirmPwd": function () {
      if (this.info.confirmPwd === "") {
        this.rePwdReadOnly = true;
        this.newPwdFocus(null, false);
      }
    }
  },
```

以上还不算完全解决，内容为空的时候点击 type="password" 的 input 框或二次（多次）点击，还是会弹出密码框。或者输入密码，回退清空再点击还是会弹出自动填充框。解决办法，加 mousedown 事件（注意不是 keydown，也不是 click）

````
addClickEvt() {
      if (this.$refs.newPwdRef) {
        this.$refs.newPwdRef.$refs.input.onmousedown =  (evt) => {
          if (evt) {
            evt.preventDefault();
            evt.stopPropagation();
          }
          if (this.info.password === "" || this.newPwdReadOnly) {
            this.$refs.newPwdRef.$refs.input.blur();
            setTimeout(() => {
              this.$refs.newPwdRef.$refs.input.focus();
            }, 0);
          }
          return false;
        };
      }
      if (this.$refs.reNewPwdRef) {
        this.$refs.reNewPwdRef.$refs.input.onmousedown =  (evt) => {
          if (evt) {
            evt.preventDefault();
            evt.stopPropagation();
          }
          if (this.info.confirmPwd === "" || this.rePwdReadOnly) {
            this.$refs.reNewPwdRef.$refs.input.blur();
            setTimeout(() => {
              this.$refs.reNewPwdRef.$refs.input.focus();
            }, 0);
          }
          return false;
        };
      }
    },
    ```
当点击（或多次点击）密码框的时候会触发mousedown事件，先失焦就阻止了自动填充框的弹出，再聚焦就实现了鼠标还在输入框的功能。
完美解决！
个人觉得实际直接绑定mousedown的处理逻辑应该就够了（没尝试）。
````

<!---->

![avatar](https://p26-passport.byteacctimg.com/img/mosaic-legacy/3793/3131589739~50x50.awebp)

<!---->
