import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from '@chakra-ui/react'
import { ChevronDownIcon } from "@chakra-ui/icons";
import Cookies from 'js-cookie';

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react'



function Header() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = React.useState('right')

window.onscroll = ()=> {
  let header = document.querySelector('header');
  let header_create_button = document.getElementById('header_create_button');
  if(window.scrollY >= 50){
    header.classList.remove('header-inactive')
    header.classList.add('header-active')
  }else{
    header.classList.remove('header-active')
    header.classList.add('header-inactive')
  }

  if(window.scrollY >= 400){
    header_create_button.classList.replace('text-blue-600','text-white')
    header_create_button.classList.remove('border-2')
    header_create_button.classList.add('scale-110')
    header_create_button.classList.add('bg-blue-600')
  }else{
    header_create_button.classList.replace('text-white','text-blue-600')
    header_create_button.classList.add('border-2')
    header_create_button.classList.remove('scale-110')
    header_create_button.classList.remove('bg-blue-600')
    
  }

}

let navigate = useNavigate()








  return (
    
    <div>

      <header className="  w-full h-16 flex py-8 pl-8  bg-white fixed z-50 transition-shadow">
        <div className="w-3/4 h-full flex items-center">
          <img
            src="https://i.postimg.cc/ZKnK7rC2/visitalogo.png"
            className="h-12 hover:h-10 z-20 mr-4 cursor-pointer"
            id="header_logo"
            onClick={()=> navigate('/')}
            onMouseEnter={()=> document.getElementById('header_logo_bg').classList.add('header-logo-bg-active')}
            onMouseLeave={()=> document.getElementById('header_logo_bg').classList.remove('header-logo-bg-active')}
          />


          <div

onClick={()=> navigate('/')}
          
          onMouseEnter={()=> document.getElementById('header_logo').classList.add('h-10')}
          onMouseLeave={()=> document.getElementById('header_logo').classList.remove('h-10')}
          
          id="header_logo_bg" className=" invisible opacity-0 w-44  h-12 absolute -ml-4 -mt-44 z-10 bg-white border rounded-full flex items-center">
            <h1 className="text-2xl text-purple-600 absolute right-10 font-visita-bold">Visita</h1>
          </div>


          <nav className="w-full h-full flex items-center lg:block hidden">
            <ul className="w-full h-full flex items-center">
              <p onClick={()=> navigate('/card/visita')} className="font-visita-medium  cursor-pointer text-third hover:text-blue-600 hover:bg-blue-50 px-3 rounded-3xl transition-colors flex items-center">
                See Demo
              </p>
              <Link to='/pricing' className=" font-visita-medium  cursor-pointer text-third hover:text-blue-600 hover:bg-blue-50 px-3 rounded-3xl transition-colors flex items-center">
                Pricing
              </Link>
              <a href="#features" className="font-visita-medium  cursor-pointer text-third hover:text-blue-600 hover:bg-blue-50 px-3 rounded-3xl transition-colors flex items-center">
                Features
              </a>
              <a href="#benefits" className="font-visita-medium  cursor-pointer text-third hover:text-blue-600 hover:bg-blue-50 px-3 rounded-3xl transition-colors flex items-center">
                Benefits
              </a>
            
              <Menu>
                <MenuButton rightIcon={<ChevronDownIcon />}>
                  <span className="font-visita-medium  cursor-pointer text-third hover:text-blue-600 hover:bg-blue-50 px-3 rounded-3xl transition-colors flex items-center" >Support <ion-icon name="chevron-down-outline"></ion-icon> </span>
                </MenuButton>
                <MenuList>
                  <MenuItem className="hover:text-blue-600 hover:bg-blue-50"  onClick={()=> navigate('/support')} ><a className="font-visita-medium  cursor-pointer text-third  hover:bg-blue-50 px-3 rounded-3xl transition-colors flex items-center"><span className="mr-2 flex items-center"><ion-icon name="help-buoy-outline"></ion-icon></span>  Help Center</a></MenuItem>
                  <MenuItem onClick={()=> {

window.tidioChatApi.show();
window.tidioChatApi.open();


                  }} className="hover:text-blue-600 hover:bg-blue-50" ><p className="font-visita-medium  cursor-pointer text-third  hover:bg-blue-50 px-3 rounded-3xl transition-colors flex items-center"><span className="mr-2 flex items-center"><ion-icon name="chatbubble-ellipses"></ion-icon></span>Chat with us</p></MenuItem>
                </MenuList>
              </Menu>

             { 
             
             Cookies.get("isFranchiseeLogined") != "true" ?
             <Link to='/franchisee/login'  className="font-visita-medium  cursor-pointer text-blue-600 transition-colors flex items-center">
              <span className="flex items-center justify-center mr-2" ><ion-icon name="log-in" ></ion-icon></span> Franchisee Login
              </Link>
              :
              <Link to='/manage/franchisee'  className="font-visita-medium  cursor-pointer text-blue-600 transition-colors flex items-center">
                Go To Franchisee
              <span className="flex items-center justify-center ml-2" ><ion-icon name="arrow-forward-circle"></ion-icon></span> 
              </Link>
              
              }

            </ul>
          </nav>
          <div className="lg:hidden block  w-full flex justify-end -mr-32 items-center h-full" >
          <span onClick={onOpen} className="text-3xl sm:-mr-24 cursor-pointer" ><ion-icon name="menu"></ion-icon></span>
          </div>
        
        </div>
        <div className="h-full w-1/4 flex  items-center lg:visible invisible">


        <Popover autoFocus={false} placement="bottom" >
  <PopoverTrigger>
  <h1 className="font-visita-medium mx-4 cursor-pointer text-third  transition-colors flex items-center">
                <span className="hover:text-blue-600 hover:bg-blue-50 px-3 -ml-3 rounded-full transition-all ">Manage Card</span>
           </h1>
  </PopoverTrigger>
  <PopoverContent>
   
    
    <PopoverHeader><span className="font-visita-bold">Enter Company Name</span></PopoverHeader>
    <PopoverBody>
      
      <div className="flex flex-col">
      <input id="manage_card_comp_name" className="border py-2 w-full pl-4 rounded-full font-visita-medium"  />
      <div className="w-full h-12 my-4 flex items-center">
        <button onClick={()=> navigate('/manage/card/' + document.getElementById('manage_card_comp_name').value)} className="px-6 py-1 bg-blue-600 rounded-full text-xl font-visita-bold text-white" >Continue</button>
      </div>
      </div>
      
      </PopoverBody>
  </PopoverContent>
</Popover>

        


        <p id="header_create_button" onClick={()=> navigate('/create')} class="py-1.5 px-8 text-md  text-blue-600 focus:outline-none bg-white rounded-full border-2 border-blue-600 cursor-pointer   hover:shadow-md  focus:z-10 focus:ring-4 focus:ring-blue-200 :focus:ring-gray-700 :bg-gray-800 :text-gray-400 :border-gray-600 :hover:text-white :hover:bg-gray-700 font-visita-bold">Create now</p>
        </div>
      </header>

     <div>
       <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay p="4" bg="whiteAlpha.1000" backdropFilter="auto" backdropBlur="2px" />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>
           <div className=" w-full flex items-center relative py-3" >
           <span className="font-visita-bold cursor-pointer absolute left-0" >Visita</span>
          <span onClick={onClose} className="text-3xl mt-2 cursor-pointer absolute right-0" ><ion-icon name="menu"></ion-icon></span>
          </div>
          </DrawerHeader>
          <DrawerBody>
            <p onClick={()=> navigate('/card/visita')} className="font-visita-bold cursor-pointer mt-4" ><span className=" text-md flex items-center text-primary" ><ion-icon name="albums"></ion-icon> <span className="ml-2 text-slate-600" >See Demo</span></span> </p>

            <p onClick={()=> {navigate('/pricing');onClose()}} className="font-visita-bold cursor-pointer mt-3" ><span className=" text-md flex items-center text-primary" ><ion-icon name="card"></ion-icon> <span className="ml-2 text-slate-600" >Pricing</span></span> </p>

            <p onClick={()=> onClose()} href='#features' className="font-visita-bold cursor-pointer mt-3" ><span className=" text-md flex items-center text-primary" ><ion-icon name="scan-circle"></ion-icon> <span className="ml-2 text-slate-600" >Features</span></span> </p>

            <p onClick={()=> onClose()} href='#benefits' className="font-visita-bold cursor-pointer mt-3" ><span className=" text-md flex items-center text-primary" ><ion-icon name="bulb"></ion-icon> <span className="ml-2 text-slate-600" >Benefits</span></span> </p>

          
            
            <p onClick={()=> {var doc = prompt("Enter Company Name");
           
           if (doc != null) {
               navigate('/manage/card/' + doc)
           };onClose()}} className="font-visita-bold cursor-pointer mt-3" ><span className=" text-md flex items-center text-primary" > <ion-icon name="create"></ion-icon> <span className="ml-2 text-slate-600" >Manage Card</span></span> </p>

            <DrawerHeader borderBottomWidth='0.5px'>
           <div className=" w-full flex items-center relative mt-6" >
           <span className="font-visita-bold cursor-pointer  text-sm -ml-6" >Support</span>
          </div>
          </DrawerHeader>

          <p onClick={() => {navigate('/support');onClose()}} className=" font-visita-bold cursor-pointer mt-3" ><span className="text-md flex items-center text-primary" ><ion-icon name="help-buoy"></ion-icon> <span className="ml-2 text-slate-600" >Help Center</span></span> </p>

          <p onClick={()=> {


  window.tidioChatApi.show();
  window.tidioChatApi.open();

          }} className=" font-visita-bold cursor-pointer mt-3" ><span className="text-md flex items-center text-primary" ><ion-icon name="chatbubble-ellipses"></ion-icon><span className="ml-2 text-slate-600" >Chat with us</span></span> </p>

          <DrawerHeader borderBottomWidth='0.5px'>
           <div className=" w-full flex items-center relative mt-6" >
           <span className="font-visita-bold cursor-pointer text-sm -ml-6" >Login</span>
          </div>
          </DrawerHeader>


          {/* <Link to='/franchisee/login' className=" font-visita-bold cursor-pointer mt-3 pb-8" ><span className="text-md flex items-center text-primary" ><ion-icon name="log-in"></ion-icon> <span className="ml-2 text-slate-600" >Franchisee Login</span></span> </Link> */}

          { 
             
             Cookies.get("isFranchiseeLogined") != "true" ?
             <Link to='/franchisee/login'  className="font-visita-medium mt-4  cursor-pointer text-blue-600 transition-colors flex items-center">
              <span className="flex items-center justify-center mr-2" ><ion-icon name="log-in" ></ion-icon></span> Franchisee Login
              </Link>
              :
              <Link to='/manage/franchisee'  className="font-visita-medium mt-4  cursor-pointer text-blue-600 transition-colors flex items-center">
                Go To Franchisee
              <span className="flex items-center justify-center ml-2" ><ion-icon name="arrow-forward-circle"></ion-icon></span> 
              </Link>
              
              }

          </DrawerBody>
        </DrawerContent>
      </Drawer>
      
     </div>
    </div>
  );
}

export default Header;
