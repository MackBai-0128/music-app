
// const flieDownload = function (data) {
//   const url = data.url
//   const flieName = data.flieName
//   const type = data.type
//   const a = data.a

//   if (!data) return
//   const blob = new Blob([url], {
//     type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'
//   })
//   const newurl = window.URL.createObjectURL(blob)
//   if ('download' in document('a')) {
//     // const a = document.createElement('a')
//     a.href = newurl
//     a.download = flieName
//     a.style.display = 'none'
//     document.body.appendChild(a)
//     a.click()
//     URL.revokeObjectURL(a.href)
//     document.body.removeChild(a)
//   } else {
//     console.log(type)

//     // navigator.msSaveBlob(blob, flieName)
//     console.log('下载失败')
//   }
// }

// export default flieDownload
// download(data) {
//     if (!data) {
//         return;
//     }
//     let blob = new Blob([data], {
//         type:
//             "application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8"
//     });
//     let url = window.URL.createObjectURL(blob);
//     let fileName = this.data.plan_no + "出团通知单.docx";
//     if ("download" in document.createElement("a")) {
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = fileName;
//         a.style.display = "none";
//         document.body.appendChild(a);
//         a.click();
//         URL.revokeObjectURL(a.href);
//         document.body.removeChild(a);
//     } else {
//         navigator.msSaveBlob(blob, fileName);
//     }
// }

// 创建blob对象
// function downloadBlob (url) {
//   return new Promise((resolve, reject) => {
//     var xhr = new XMLHttpRequest()
//     xhr.open('GET', url)
//     xhr.responseType = 'blob'

//     xhr.onload = function () {
//       if (xhr.status === 200) {
//         resolve(xhr.response)
//       } else {
//         reject(new Error(xhr.statusText || 'Download failed.'))
//       }
//     }
//     xhr.onerror = function () {
//       reject(new Error('Download failed.'))
//     }
//     xhr.send()
//   })
// }
// // 主要用于下载导出的代码
// export function downloadFile (url, fileName = '') {
//   return downloadBlob(url, fileName)
//     .then(resp => {
//       if (resp.blob) {
//         return resp.blob()
//       } else {
//         return new Blob([resp])
//       }
//     })
//     .then(blob => URL.createObjectURL(blob))
//     .then(url => {
//       downloadURL(url, fileName)
//       URL.revokeObjectURL(url)
//     })
//     .catch(err => {
//       throw new Error(err.message)
//     })
// }
