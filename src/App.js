import React, { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import "./App.css";
import pageImg from "./assets/page.png";
import staticImg from "./assets/static.png";
// import PDFJS from "pdfjs-dist";
// import PDFJS from "pdfjs-dist";
// import PDFJSWorker from "pdfjs-dist/build/pdf.worker.js"; // add this to fit 2.3.0

function App() {
  // PDFJS.disableTextLayer = true;
  // PDFJS.disableWorker = true; // not availaible anymore since 2.3.0 (see imports)

  // const getPageText = async (pdf: Pdf, pageNo: number) => {
  //   const page = await pdf.getPage(pageNo);
  //   const tokenizedText = await page.getTextContent();
  //   const pageText = tokenizedText.items.map((token) => token.str).join("");
  //   return pageText;
  // };

  // /* see example of a PDFSource below */
  // export const getPDFText = async (source: PDFSource): Promise<string> => {
  //   Object.assign(window, { pdfjsWorker: PDFJSWorker }); // added to fit 2.3.0
  //   const pdf: Pdf = await PDFJS.getDocument(source).promise;
  //   const maxPages = pdf.numPages;
  //   const pageTextPromises = [];
  //   for (let pageNo = 1; pageNo <= maxPages; pageNo += 1) {
  //     pageTextPromises.push(getPageText(pdf, pageNo));
  //   }
  //   const pageTexts = await Promise.all(pageTextPromises);
  //   return pageTexts.join(" ");
  // };
  // =====================================================
  // function gettext(pdfUrl) {
  //   var pdf = PDFJS.getDocument(pdfUrl);
  //   return pdf.then(function (pdf) {
  //     // get all pages text
  //     var maxPages = pdf.pdfInfo.numPages;
  //     var countPromises = []; // collecting all page promises
  //     for (var j = 1; j <= maxPages; j++) {
  //       var page = pdf.getPage(j);
  //       var txt = "";
  //       countPromises.push(
  //         page.then(function (page) {
  //           // add page promise
  //           var textContent = page.getTextContent();
  //           return textContent.then(function (text) {
  //             // return content promise
  //             return text.items
  //               .map(function (s) {
  //                 return s.str;
  //               })
  //               .join(""); // value page text
  //           });
  //         })
  //       );
  //     }
  //     // Wait for all pages and join text
  //     return Promise.all(countPromises).then(function (texts) {
  //       return texts.join("");
  //     });
  //   });
  // }
  // // waiting on gettext to finish completion, or error
  // gettext("https://cdn.mozilla.net/pdfjs/tracemonkey.pdf").then(
  //   function (text) {
  //     alert("parse " + text);
  //   },
  //   function (reason) {
  //     console.error(reason);
  //   }
  // );
  // =================================================================================
  // async function getContent(src) {
  //   const doc = await pdfjs.getDocument(src).promise; // note the use of the property promise
  //   const page = await doc.getPage(1);
  //   return await page.getTextContent();
  // }
  // async function getItems(src) {
  //   const content = await getContent(src);
  //   return content.items.map((item) => item.str);
  // }
  // return (
  //   <div className="App">
  //     <p>
  //       {getItems(
  //         "https://www.adobe.com/content/dam/acom/en/devnet/pdf/pdfs/pdf_reference_archives/PDFReference.pdf"
  //       )}
  //     </p>
  //   </div>
  // );
  // ================================================================================
  const worker = createWorker({
    logger: (m) => console.log(m),
  });
  const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    // const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
    // const {data: { text }} = await worker.recognize(pageImg);
    const {
      data: { text },
    } = await worker.recognize(staticImg);
    setOcr(text);
  };
  const [ocr, setOcr] = useState("Recognizing...");
  useEffect(() => {
    doOCR();
  });
  return (
    <div className="App">
      <p>{ocr}</p>
    </div>
  );
}

export default App;
