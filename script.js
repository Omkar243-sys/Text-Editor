$(document).ready(function () {
    const textInput = $("#textInput");
    const fontSizeInput = $("#fontSize");
    const fontSizeValue = $("#fontSizeValue");
    const fontFamilySelect = $("#fontFamily");
    const fontColorInput = $("#fontColor");
    const designBox = $("#designBox");
    const deleteTextButton = $("#deleteTextButton");
  
    let selectedElement = null;
  
  
    function updateTextStyles(element) {
      if (element) {
        const fontSize = fontSizeInput.val() + "px";
        const fontFamily = fontFamilySelect.val();
        const fontColor = fontColorInput.val();
  
        element.css({
          "font-size": fontSize,
          "font-family": fontFamily,
          color: fontColor,
        });
      }
    }
  
    // Event listeners for controls
    fontSizeInput.on("input", function () {
      fontSizeValue.text(fontSizeInput.val() + "px");
      if (selectedElement) {
        updateTextStyles(selectedElement);
      }
    });
  
    fontFamilySelect.on("change", function () {
      if (selectedElement) {
        updateTextStyles(selectedElement);
      }
    });
  
    fontColorInput.on("input", function () {
      if (selectedElement) {
        updateTextStyles(selectedElement);
      }
    });
  
  
    $("#addTextButton").on("click", function () {
      const text = textInput.val();
      if (text.trim() !== "") {
        const newTextElement = $('<div class="draggable">' + text + "</div>");
        newTextElement.appendTo(designBox);
        updateTextStyles(newTextElement);
        newTextElement.draggable({
          containment: designBox,
        });
        newTextElement.on("click", function (event) {
          $(".draggable").removeClass("selected");
          newTextElement.addClass("selected");
          selectedElement = newTextElement;
          
          fontSizeInput.val(parseInt(newTextElement.css("font-size")));
          fontSizeValue.text(newTextElement.css("font-size"));
          fontFamilySelect.val(
            newTextElement.css("font-family").replace(/"/g, "")
          );
          fontColorInput.val(rgbToHex(newTextElement.css("color")));
          event.stopPropagation();
        });
      }
    });
  
  
    deleteTextButton.on("click", function () {
      if (selectedElement) {
        selectedElement.remove();
        selectedElement = null;
      }
    });
  
    designBox.on("click", function (e) {
      if (e.target === this) {
        $(".draggable").removeClass("selected");
        selectedElement = null;
      }
    });
  
    function rgbToHex(rgb) {
      const rgbArray = rgb.replace(/[^\d,]/g, "").split(",");
      return (
        "#" +
        rgbArray
          .map((x) => {
            const hex = parseInt(x).toString(16);
            return hex.length === 1 ? "0" + hex : hex;
          })
          .join("")
      );
    }
  });