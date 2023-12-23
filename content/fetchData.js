const fetchData = async () => {
  try {
    const response = await fetch("https://tiddlyhost.com/sites");
    const data = await response.text();

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = data;

    // Find the table row with "neotw"
    const tableRow = tempDiv.querySelector('tr:has(.sitelink a[name="neotw"])');

    if (tableRow) {
      // Get the views element
      const viewsTd = tableRow.querySelector(".views");

      // Get the views
      const views = viewsTd.textContent.trim();

      // Output the views
      console.log("neotw 的访问量：", views);
    } else {
      console.log('未找到 "neotw" 的信息');
    }
  } catch (error) {
    console.error("获取页面失败：", error);
  }
};

fetchData();