import React, { useState } from 'react';
import loginstyle from "./Download.module.css";
import axios from 'axios';

function Download2() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [username, setUsername] = useState(""); // 用户名
  const [filename, setFilename] = useState(""); // 文件名

  // 文件选择
  const handleFileSelect = async (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);

    // 过滤文件
    const allowedFileTypes = ['image/jpeg', 'image/png'];
    const filteredFiles = fileArray.filter((file) =>
      allowedFileTypes.includes(file.type)
    );

    // Add the selected files to the state
    setSelectedFiles(filteredFiles);//add
    setUsername("${username}");//add
    const user_name="${username}"
    selectedFiles.forEach((file)=>{
      setFilename(file.name);//add
      try {
        // 发送请求到URL
        console.log(file.name);
        console.log('发送请求到URL:',file.name, 'http://localhost:8080/api/upload/download');//?filename=${filename}&username=${username}
        // const response = await fetch('http://localhost:8080/api/upload/download', {
        //   method: 'GET',
        //   body: formData,
        // });
        axios.get(`http://localhost:8080/api/upload/download?filename=${file.name}&username=${user_name}`, { responseType: 'blob' })
          .then(response => {
            console.log(response.data);
            // Handle success
            alert('download success')
            // Get the filename from the custom header (X-Filename)
            //const downloadedFilename = response.headers['x-filename'];
  
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.setAttribute("download",file.name);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          })
          .catch(error => {
            console.error(error);
            console.error('文件上傳失敗');
            // Handle error
          });
      } catch (error) {
        console.error('发生错误:', error);
      }
  
    });

    // 使用formData
    // const formData = new FormData();
    // formData.append('username', username); // 用户名
    // formData.append('filename', filename); // 文件名
    // filteredFiles.forEach((file, index) => {
    //   formData.append(`images`, file); 
    // });

    try {
      // 发送请求到URL
      console.log('发送请求到URL:', 'http://localhost:8080/api/upload/download');//?filename=${filename}&username=${username}
      // const response = await fetch('http://localhost:8080/api/upload/download', {
      //   method: 'GET',
      //   body: formData,
      // });
      axios.get(`http://localhost:8080/api/upload/download?filename=${filename}&username=${username}`, { responseType: 'blob' })
        .then(response => {
          console.log(response.data);
          // Handle success
          alert('download success')
          // Get the filename from the custom header (X-Filename)
          const downloadedFilename = response.headers['x-filename'];

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement('a');
          a.href = url;
          a.setAttribute("download",filename);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch(error => {
          console.error(error);
          console.error('文件上傳失敗');
          // Handle error
        });
    } catch (error) {
      console.error('发生错误:', error);
    }

    // 預覽圖像
    const previews = filteredFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

  // 文件下載 //modified
  const handleDownload = (file) => {
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([file]));
    a.setAttribute("download", file.name);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 處理刪除單一圖片
  const handleDeleteImage = (index) => {
    const updatedFiles = [...selectedFiles];
    const updatedPreviews = [...imagePreviews];

    updatedFiles.splice(index, 1); 
    updatedPreviews.splice(index, 1); 

    setSelectedFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  // 刪除預覽
  const handleDeleteAllPreviews = () => {
    setImagePreviews([]);
    setSelectedFiles([]);
  };

  // 下載預覽 //modified
  const handleDownloadAll = () => {
    selectedFiles.forEach((file) => {
      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(new Blob([file]));
      console.log(a.href)
      a.setAttribute("download", file.name);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  return (
    <div className={loginstyle.background}>
      <h1>UPLOAD/DOWNLOAD</h1>
      <input type="file" accept="image/*" multiple name="images" onChange={handleFileSelect} />
      <div className="previews">
        {imagePreviews.map((preview, index) => (
          <span key={index} className="preview">
            <img
              src={preview}
              alt={`image ${index}`}
              style={{ width: '150px', height: '150px' }}
            />
            <button onClick={() => handleDeleteImage(index)}>刪除</button>
            <button onClick={() => handleDownload(selectedFiles[index])}>Download</button>
          </span>
        ))}
      </div>
      <button onClick={handleDeleteAllPreviews}>Remove all</button>
      <button onClick={handleDownloadAll}>Download All</button>
    </div>
  );
}

export default Download2;



/* import React, { useState } from 'react';
import loginstyle from "./Download.module.css";

function Download2() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [username, setUsername] = useState(""); // username
  const [filename, setFilename] = useState(""); // filename

  // decision 
  const handleFileSelect = async (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);

    // filter
    const allowedFileTypes = ['image/jpeg', 'image/png'];
    const filteredFiles = fileArray.filter((file) =>
      allowedFileTypes.includes(file.type)
    );

    // 預覽圖像
    const previews = filteredFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);

    // 构建GET请求URL
    const getUrl = `http://localhost:8080/api/upload/download?filename=${filename}&username=${username}`;

    try {
      // 发送GET请求
      console.log('发送请求到URL:', getUrl);
      const response = await fetch(getUrl, {
        method: 'GET',
      });
      console.log('收到后端响应:', response);
      if (response.ok) {
        // 文件下载成功
        console.log('文件下載成功');
      } else {
        // 處理失敗 跟我一樣失敗
        console.error('文件下載失敗');
      }
    } catch (error) {
      console.error('发生错误:', error);
    }
  };

  // 處理刪除單一圖片
  const handleDeleteImage = (index) => {
    const updatedFiles = [...selectedFiles];
    const updatedPreviews = [...imagePreviews];

    updatedFiles.splice(index, 1); 
    updatedPreviews.splice(index, 1); 

    setSelectedFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  // 刪除預覽
  const handleDeleteAllPreviews = () => {
    setImagePreviews([]);
    setSelectedFiles([]);
  };

  // 下載預覽
  const handleDownloadAll = () => {
    selectedFiles.forEach((file) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(file);
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  return (
    <div className={loginstyle.background}>
      <h1>UPLOAD/DOWNLOAD</h1>
      <input type="file" accept="image/*" multiple name="images" onChange={handleFileSelect} />
      <div className="previews">
        {imagePreviews.map((preview, index) => (
          <span key={index} className="preview">
            <img
              src={preview}
              alt={`image ${index}`}
              style={{ width: '150px', height: '150px' }}
            />
            <button onClick={() => handleDeleteImage(index)}>刪除</button>
          </span>
        ))}
      </div>
      <button onClick={handleDeleteAllPreviews}>Remove all</button>
      <button onClick={handleDownloadAll}>Download All</button>
    </div>
  );
}

export default Download2;
*/