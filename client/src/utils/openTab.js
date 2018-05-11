export default function openTab(tabID, btn) {
  const tabs = document.getElementsByClassName("tab");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }
  const selectedTab = document.getElementById(tabID);
  selectedTab.style.display = "flex";
  const btns = document
    .getElementById("model-tabs")
    .getElementsByTagName("button");
  for (let i = 0; i < btns.length; i++) {
    btns[i].className = "btn rounded-0";
  }
  btn.className = "btn btn-secondary ";
}
