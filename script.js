const uploadBox = document.querySelector(".upload-box"),
previewImg = uploadBox.querySelector("img"),
fileInput = uploadBox.querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input"),
ratioInput = document.querySelector(".ratio input"),
qualityInput = document.querySelector(".quality input"),
downloadBtn = document.querySelector(".download-btn");

let ogImageRatio;

const loadFile = (e) => {
    const file = e.target.files[0]; // Returns the first image the user selects
    if(!file) return; // If the user did not select any file we will return
    previewImg.src = URL.createObjectURL(file); // We write the selected img file into the html file.
    previewImg.addEventListener("load", () => { // once img loaded
        widthInput.value = previewImg.naturalWidth;// naturalWidth returns the original width of the image and writes it into the box
        heightInput.value = previewImg.naturalHeight;// naturalHeight returns the original Height of the image and writes it into the box
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    });
}

widthInput.addEventListener("keyup", () => {
   // If the checkbox is checked, we adjust the height according to the width. There is a certain ratio and this ratio always remains the same.
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup", () => {
    // If the checkbox is checked, we adjust the width according to the height. There is a certain ratio and this ratio always remains the same.
    const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
});

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    // If the quality checkbox is selected, choose 70% quality, otherwise we choose 100% quality.
    const imgQuality = qualityInput.checked ? 0.5 : 1.0;

    // set canvas height and width based on input values

    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

     // We write the values from the canvas (the width and height we want to set in the image) on the image.
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    
    // passing canvas data url as href of <a > element
    // We change the url of the image to the selected image href value.
    a.href = canvas.toDataURL("image/jpeg", imgQuality);
    a.download = new Date().getTime(); // We take the current time as the download value
    a.click(); // Click <a> to download the file
}
// I wrote a function to set downloads of the image
downloadBtn.addEventListener("click", resizeAndDownload);
// transfer the picture to the screen
fileInput.addEventListener("change", loadFile);
// Wherever she clicks within the uploadbox frame, it will be as if she clicked directly on the input.
uploadBox.addEventListener("click", () => fileInput.click());