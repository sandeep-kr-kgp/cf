import Layout from './Layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './App.css';
import Sidebar from './Sidebar';
import MoveableLayout from './MoveableLayout';
function App() {
    return (
        <div className='main-app'>
            <Sidebar />
            {/* <Layout /> */}
            <MoveableLayout />
        </div>
    );
}

export default App;
