const copyBtn = document.getElementById("copyBtn");
const copyText = document.getElementById("copyText");
const copiedMsg = document.getElementById("copiedMsg");

copyBtn.addEventListener("click", () => {
  copyText.select();
  document.execCommand("copy");

  // show "Copied!" animation
  copiedMsg.classList.add("show");

  setTimeout(() => {
    copiedMsg.classList.remove("show");
  }, 1500);
});
