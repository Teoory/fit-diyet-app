import ReactQuill from 'react-quill';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';
// import '../../QuillSnow.css';

const Editor = ({value, onChange}) => {
    
const modules = {
    toolbar: [
        [{ 'font': [] }],
        [{ 'header': [2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }, {'indent': '-1'}, {'indent': '+1'}],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['link', 'image', 'video'],
    ]
};
  
const formats = [
    'font',
    'header',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'color', 'background',
    'align', 'indent',
    'list', 'bullet',
    'link', 'image', 'video',
];

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.querySelector(".ql-toolbar.ql-snow") === null) return;
  const toolbar = document.querySelector(".ql-toolbar.ql-snow");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    toolbar.style.position = "fixed";
    toolbar.style.top = "80px";
    toolbar.style.zIndex = 999;
    toolbar.style.backgroundColor = "white";
  } else if (document.body.scrollTop < 200 || document.documentElement.scrollTop < 200) {
    toolbar.style.position = "relative";
  }
  else return;
}

  return (
    <ReactQuill theme="snow" 
                value={value}
                onChange={onChange} 
                modules={modules}
                formats={formats} />
  )
}

export default Editor