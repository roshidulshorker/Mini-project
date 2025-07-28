// Get elements
const tabs = document.querySelectorAll("nav ul li");
const textareas = {
  html: document.getElementById("editor-html"),
  css: document.getElementById("editor-css"),
  js: document.getElementById("editor-js"),
};
const previewFrame = document.getElementById("preview-frame");

// Initialize CodeMirror editors
const editors = {
  html: CodeMirror.fromTextArea(textareas.html, {
    mode: "htmlmixed",
    theme: "default",
    autoCloseBrackets: true,
    autoCloseTags: true,
    lineWrapping: true,
  }),
  css: CodeMirror.fromTextArea(textareas.css, {
    mode: "css",
    theme: "default",
    autoCloseBrackets: true,
    autoCloseTags: true,
    lineWrapping: true,
  }),
  js: CodeMirror.fromTextArea(textareas.js, {
    mode: "javascript",
    theme: "default",
    autoCloseBrackets: true,
    autoCloseTags: true,
    lineWrapping: true,
  }),
};

// Initially show only HTML editor
Object.keys(editors).forEach((key, index) => {
  const cm = editors[key];
  const wrapper = cm.getWrapperElement();
  wrapper.style.display = index === 0 ? "block" : "none";
});

// Handle tab switching
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const keys = Object.keys(editors);
    keys.forEach((key, i) => {
      const cm = editors[key];
      const wrapper = cm.getWrapperElement();
      wrapper.style.display = i === index ? "block" : "none";
      cm.refresh(); // Fix layout issue
    });
  });
});

// Typing effect paste function
function simulateTyping(cm, text, speed = 20) {
  let i = 0;
  function typeChar() {
    if (i < text.length) {
      cm.replaceRange(text[i], cm.getCursor());
      i++;
      setTimeout(typeChar, speed);
    }
  }
  typeChar();
}

// Paste override: Block default paste and apply typing effect
Object.values(editors).forEach((cm) => {
  cm.on("beforeChange", function (instance, changeObj) {
    if (changeObj.origin === "paste") {
      const pastedText = (changeObj.text || []).join("\n");
      changeObj.cancel(); // cancel default paste
      simulateTyping(instance, pastedText, 40); // speed in ms per letter
    }
  });
});

// Live preview update
function updatePreview() {
  const html = editors.html.getValue();
  const css = `<style>${editors.css.getValue()}</style>`;
  const js = `<script>
      document.addEventListener("DOMContentLoaded", function() {
        ${editors.js.getValue()}
      });
    <\/script>`;

  const fullContent = `${html}\n${css}\n${js}`;
  const frame = previewFrame.contentWindow.document;
  frame.open();
  frame.write(fullContent);
  frame.close();
}

// Bind change event for live preview
Object.values(editors).forEach((cm) => {
  cm.on("change", updatePreview);
});

// Initial preview
updatePreview();
