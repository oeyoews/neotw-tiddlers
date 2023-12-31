这是因为默认情况下，JavaScript 对数字类型的排序是按照字符串排序的方式进行的。也就是说，它会将数字转换为字符串，然后按照字符串的顺序进行排序。

在字符串排序中，字符串是按照字符的 Unicode 编码值进行排序的。因此，如果数字的位数不同，它们在转换为字符串时长度也不同，就会出现上述的排序问题。

例如，对于数字 1、11 和 2，它们转换为字符串后的长度分别是 1、2 和 1，因此它们在排序时的顺序是 1、11、2，而不是我们期望的 1、2、11。

为了解决这个问题，我们可以在数字前面补零，使它们在转换为字符串后具有相同的长度。这样，在字符串排序时就能够按照我们期望的顺序进行排序。

例如，对于数字 1、11 和 2，我们可以将它们分别转换为字符串 '001'、'011' 和 '002'，这样它们在字符串排序时的顺序就是我们期望的 1、2、11。

因此，在代码中我们需要使用`.padStart()`方法来将数字补足为相同的长度，以便进行正确的排序。