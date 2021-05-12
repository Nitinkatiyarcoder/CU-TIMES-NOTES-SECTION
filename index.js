const dropzone = document.querySelector(".drop-zone");
const browsebtn = document.querySelector(".browsebtn");
const fileInput = document.querySelector("#fileInput");

const host = "https://CuiansPdfNotes.herokuapp.com/";
const uploadURL = `${host}api/files`;
// const uploadURL = `${host}api/files`;

dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();

    if (!dropzone.classList.contains("dragged")) {
        dropzone.classList.add("dragged");
    }
});

dropzone.addEventListener("dragleave", ()=> {
    dropzone.classList.remove("dragged");
});

dropzone.addEventListener("drop", (e)=> {
    e.preventDefault();
    dropzone.classList.remove("dragged");
    const files = e.dataTransfer.files;
    console.table(files);
    if (files.length){
        fileInput.files = files;
        uploadfile();
    }
});

fileInput.addEventListener("change", ()=>{
    uploadfile();
});

browsebtn.addEventListener("click", ()=>{
    fileInput.click();
});

const uploadfile = ()=>{

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("myfile", file);

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            console.log(xhr.response);
        }      
    };

    xhr.open("POST", uploadURL);
    xhr.send(formData);
};