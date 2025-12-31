import { useState,useEffect} from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Sidebar from '../components/Sidebar'
import Heading from '../components/Heading'
import Introduction from '../components/Introduction'
import "../styles/Sidebar.css"
import Basics from '../components/Basics'
import Editors from '../components/Editors'
import Elements from '../components/Elements'
import Attributes from '../components/Attributes'
import Headings from '../components/Headings'
import Paragraphs from '../components/Paragraphs'
import TextFormatting from '../components/TextFormatting'
import Block_Inline from '../components/Block_Inline'
import Lists from '../components/Lists'
function Component() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const openSidebar = () => setIsSidebarOpen(false);
  const closeSidebar = () => setIsSidebarOpen(false);
  const [activeSection, setActiveSection] = useState("introduction");
  const showContent = (section) => setActiveSection(section);
  return (
    <div className="parent">
       <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
        showContent={showContent}
       />
      <div className="main">
      <Heading openSidebar={openSidebar} />
      {activeSection === "introduction" && <Introduction showContent={showContent}/>}
      {activeSection === "basics" && <Basics showContent={showContent}/>}
      {activeSection === "editors" && <Editors showContent={showContent}/>}
      {activeSection === "elements" && <Elements showContent={showContent}/>}
      {activeSection === "attributes" && <Attributes showContent={showContent}/>}
      {activeSection === "block_inline" && <Block_Inline showContent={showContent}/>}
      {activeSection === "headings" && <Headings showContent={showContent}/>}
      {activeSection === "paragraphs" && <Paragraphs showContent={showContent}/>}
      {activeSection === "textformatting" && <TextFormatting showContent={showContent}/>}
      {activeSection === "lists" && <Lists showContent={showContent}/>}
      </div>
    </div>
  )
}

export default Component;