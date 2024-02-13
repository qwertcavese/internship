import logo from './logo.svg';
import './App.css';
import Crudapp from './crud_operations/Crudapp';
import Adminpanelapp from './admin_panel/Adminpanelapp';
import Routesadminpanel from './admin_panel/Routesadminpanel';
import  AppBar  from './admin_panel/Appbar';
import PdfViewer from './pdf_viewer/PdfViewer';
import Routestodo from './Todo/Routestodo';






function App() {

  const apiURL="http://192.168.29.183:8000"
  // console.log(process.env.REACT_APP_URL);

  return (
    <div className="App">
      {/* <Crudapp/> */}
      {/* <Routesadminpanel/> */}
      {/* <PdfViewer/> */}
      <Routestodo apiURL={apiURL}/>
    </div>
  );
}

export default App;
