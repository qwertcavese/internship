import React, { useEffect, useState } from 'react';
import { getDocument } from 'pdfjs-dist/webpack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './Pdfviewerapp.css'


const PdfViewer = () => {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    const pdfUrl = "https://ncu.rcnpv.com.tw/Uploads/20131231103232738561744.pdf";

    const lastIndex = pdfUrl.lastIndexOf("/");
    const title = pdfUrl.substring(lastIndex + 1, pdfUrl.length-4);
    setPdfTitle(title);
    let renderTask = null;

    const renderPage = async (num, doc) => {
      if (doc) {
        const page = await doc.getPage(num);
        const canvas = document.getElementById("pdf_link");
        const context = canvas.getContext('2d');
        var viewport = page.getViewport();
        if(window.innerWidth<=394&&window.innerWidth>361){
          viewport=page.getViewport({scale :0.72})
          console.log(window.innerWidth);
        }
        else if(window.innerWidth<=361){
          viewport=page.getViewport({scale :0.65})
        }
        else if(window.innerWidth<=435){
          
          viewport=page.getViewport({scale :0.75})
        }
        else if(window.innerWidth<=830&&window.innerHeight<=1030){
          
          viewport=page.getViewport({scale :1.1})
          console.log(window.innerWidth,window.innerHeight);
        }
        else if(window.innerWidth<=876&&window.innerHeight<=1300){
          
          viewport=page.getViewport({scale :1.3})
        }
        else if(window.innerWidth>1440){

        viewport=page.getViewport({scale :1.9})
        }
        else{
          viewport=page.getViewport({scale :1.5})
          console.log(window.innerWidth);
        }
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (renderTask) {
          renderTask.cancel();
        }

        renderTask = page.render({
          canvasContext: context,
          viewport: viewport
        });

        renderTask.promise.then(() => {
          renderTask = null;
        }).catch(error => {
          console.error('Error rendering PDF page:', error);
        });
      }
    };

    const loadPdf = async () => {
      try {
        const doc = await getDocument(pdfUrl).promise;
        setPdfDoc(doc);
        renderPage(pageNum, doc);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    loadPdf();

    return () => {
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [pageNum]);

  const setPdfTitle = (title) => {
    document.getElementById("pdf_title").innerHTML = title;
  };

  const nextPage = () => {
    if (pdfDoc && pageNum < pdfDoc.numPages) {
      setPageNum(pageNum + 1);
    }
  };

  const prevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  return (
    <div className='pdf-viewer-main-container'>
      <div className="pdf-viewer-container border border-5">
        {/* we can also write our class name at starting of className and then we can write properties of
        bootstrap class so we do not have to replace full name of class and write their code 
        with the help of this method both inline and external css can be used
        here "pdf-title-container" is our own class and "text-light text-center" are their class 
        properties */}
        <div className="pdf-title-container text-light text-center">
          <p className="m-0" id="pdf_title"></p>
        </div>
        <div className="pdf_div">
          <canvas id="pdf_link"></canvas>
        </div>
        <div className="bg-dark text-light text-center d-flex align-items-center justify-content-center gap-5">
          <p onClick={prevPage} className="m-0 cursor-pointer"><ArrowBackIosIcon style={{cursor:"pointer"}}/></p>
          <p id="pg_no" className="m-0 text-white">{pageNum} of {pdfDoc ? pdfDoc.numPages : 0}</p>
          <p onClick={nextPage} className="m-0 cursor-pointer"><ArrowForwardIosIcon style={{cursor:"pointer"}}/></p>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
