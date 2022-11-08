import axios from "axios";
import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Tooltip, useToast } from '@chakra-ui/react'
import { Toast } from "../../miniComponents/Toast";
import html2canvas from 'html2canvas';


function Successfull() {
  // Function To Capitalize Strings
  function capitalize(string) {
    return string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    );
  }

  let params = useParams();
  let comp_name = params.comp_name;
  let comp_name_clean = comp_name.replace(/[-]/g, " ");
  let [cardDatas,setCardDatas] = useState([])
  let [tooltipIsOpen,setTooltipIsOpen] = useState(false)
  let navigate = useNavigate()
  let base_url = 'https://visitasmart.com'
  let manage_card_url = base_url + '/manage/card/' + comp_name
  let toast = useToast()
  


  useEffect(() => {

    setTimeout(()=> {
      setTooltipIsOpen(true)
    },2500)

    setTimeout(()=> {
      setTooltipIsOpen(false)
    },6000)

    document.title = "Successfull | " + capitalize(comp_name_clean);
    document.querySelectorAll("header").forEach((elem) => {
      elem.style.display = "none";  
    });

  axios.get('http://localhost:3005/card/' + comp_name).then((response)=> {
    setCardDatas(response.data)
    if(!response.data.activated){
      navigate('/create/preview/' + comp_name)
    }else{

    }
  }).catch((err)=> {
    console.log(err);
  })

  },[]);


  let share_whatsapp_url = `https://api.whatsapp.com/send?text=${base_url + '/card/' + comp_name}`;
  let share_sms_url = `sms:?body=${base_url + '/card/' + comp_name}`;
  let share_facebook_url = `https://www.facebook.com/sharer/sharer.php?u=${base_url + '/card/' + comp_name}`;
  let share_twitter_url = `https://twitter.com/intent/tweet?text=${base_url + '/card/' + comp_name}`;
  let share_linkedin_url = `https://www.linkedin.com/cws/share?url=${base_url + '/card/' + comp_name}`;



  // Download QR Code
  function PrintDiv()
{

  let company_name = cardDatas && cardDatas.company_name.replace(/[ ]/g,'-').toLowerCase()
  let download_name = company_name + '-qrcode.jpg'

  let downloadLink = document.createElement('a');
  downloadLink.setAttribute('download', download_name);
  var canvas = document.getElementById("qr-code");
  var dataURL = canvas.toDataURL("image/jpg");
  downloadLink.setAttribute('href', dataURL);
  downloadLink.click();
}


  return (
    <div  >

      {
        cardDatas && cardDatas.franchisee != "no franchisee" ?
        <h1 onClick={()=> navigate('/manage/franchisee')} className="cursor-pointer hover:scale-105 transition-transform py-3 px-6 bg-blue-600 font-visita-bold rounded-full text-white absolute right-12 top-6">
        Go To Franchisee
      </h1>
    :''  
    }

      <div className="h-screen w-full z-[100] bg-white  absolute card-preview-successfull-animation flex items-center justify-center">
        <div className="w-[200px] -mt-16">
        <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_pqnfmone.json"  background="transparent"  speed="1" autoplay></lottie-player>
        </div>
        </div>

    



      <div id="qrcode_div" className="overflow-y-scroll pb-32 h-screen z-50 w-full flex flex-col items-center lg:px-64 px-4 pt-16 ">
        <h1 className="text-4xl font-visita-bold mb-6 capitalize">
          Send Card
        </h1>
        <div className="px-10 z-50 h-12 bg-green-50 flex items-center justify-center border border-green-600 text-green-600 rounded-full">
          <h1 className="font-visita-medium lg:text-xl text-center">
          {base_url}/card/ {comp_name}
            
          <Tooltip  isOpen={tooltipIsOpen} hasArrow   px='4' bg='black' py='2' color='white' rounded='lg' label='click to copy' placement='right'>
 <i
             
              class={`fa-solid fa-copy text-green-900 cursor-pointer ml-3`}
              onClick={()=> {navigator.clipboard.writeText(base_url + '/card/' + comp_name)
            
              Toast({
                status: 'success',
                title: 'Copied!',
                postition: 'top',
                toast
              })
              
            
            }}
            ></i>
</Tooltip>
          </h1>
          <div
            id="tooltip-light"
            role="tooltip"
            class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm opacity-0 tooltip"
          >
            <span className="font-visita-medium" id="copy-tooltip">
              Copy Link
            </span>
          </div>
        </div>

          <div className="lg:w-[50%] relative w-full py-10 lg:pt-10 pt-16 bg-white border mt-8 rounded-3xl z-50 flex items-center justify-center">

          <Tooltip  isOpen={tooltipIsOpen} hasArrow   px='4' bg='black' py='2' color='white' rounded='lg' label='click to download qrcode' placement='right'>

            <span onClick={()=> PrintDiv()}  className="py-2 px-2 transition-all rounded-full cursor-pointer text-xl hover:bg-blue-600 hover:text-white absolute right-5 top-4 flex items-center justify-center bg-white border-blue-600 border text-blue-600" ><ion-icon name="arrow-down-outline"></ion-icon></span>

            </Tooltip>

        
         <QRCode
         id="qr-code"
         enableCORS={true}
              value={`${base_url}/${comp_name}`}
              eyeRadius={20}
              logoImage={cardDatas && cardDatas.logo}
              logoWidth={60}
              logoHeight={60}
              size={280}
              qrStyle="dots"
              fgColor={cardDatas && cardDatas.theme_color}
            />
         </div>

          <div className="w-[50%] mt-4 h-16 flex items-center justify-center z-50">


              <button onClick={()=> window.open(base_url + '/card/' + comp_name)} className=" py-3 w-full bg-white text-blue-600  border transition-colors hover:bg-blue-600  hover:text-white cursor-pointer rounded-full font-visita-bold">Open Your Card</button>
          </div>

          <div className="w-50 z-50 h-16 mt-10 flex items-center justify-center">

         <a href={share_facebook_url}> <i class="fa-brands text-blue-600 hover:text-blue-900 text-4xl fa-facebook mr-6 cursor-pointer hover:scale-110 transition-transform"></i></a>

         <a href={share_twitter_url}> <i class="fa-brands text-blue-500 hover:text-blue-900 text-4xl fa-twitter mr-6 cursor-pointer hover:scale-110 transition-transform"></i></a>

         <a href={share_linkedin_url}> <i class="fa-brands text-sky-600 hover:text-sky-900 text-4xl fa-linkedin mr-6 cursor-pointer hover:scale-110 transition-transform"></i></a>
          
         <a href={share_whatsapp_url}> <i class="fa-brands text-green-600 hover:text-green-900 text-4xl fa-whatsapp mr-6 cursor-pointer hover:scale-110 transition-transform"></i></a>

         <a href={share_sms_url}> <i class="fa-solid text-stone-600 hover:text-stone-900 text-4xl fa-envelope cursor-pointer hover:scale-110 transition-transform"></i></a>
          </div>

          <div className="flex z-50 flex-col items-center mt-20 ">
          <h1 className="lg:text-3xl text-xl font-visita-bold mb-6 mt-10 capitalize">
          Manage or Edit Your Card
        </h1>



        <div className="lg:px-10 lg:h-12 h-24 relative lg:w-full w-[60%] mt-20 bg-blue-50 flex items-center justify-center border  text-blue-600 lg:rounded-b-xl rounded-xl">
          <div className="lg:w-full w-[70%] absolute text-blue-600 font-visita-bold lg:text-xl text-md rounded-t-xl -top-10 h-10 flex items-center justify-center bg-blue-200">
            <h1>Card Manage Link</h1>
          </div>
          <h1 className="font-visita-medium lg:w-auto w-[70%]  lg:text-xl text-center">
          {manage_card_url}


          <Tooltip   px='4' bg='black' py='2' color='white' rounded='xl' label='click to copy' placement='right'>
 <i
             
              class="fa-solid fa-copy text-blue-900 cursor-pointer ml-3"
              onClick={()=> {navigator.clipboard.writeText(manage_card_url)
              

                Toast({
                  status: 'success',
                  title: 'Copied!',
                  postition: 'top',
                  toast
                })
              
              
              }}
            ></i>
</Tooltip>


           
          </h1>
          <div
            id="tooltip-light"
            role="tooltip"
            class="inline-block absolute invisible py-2 px-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm opacity-0 tooltip"
          >
            <span className="font-visita-medium" id="copy-tooltip">
              Copy Manage Link
            </span>
          </div>
        </div>

        <div className="px-10 lg:h-12 h-24 w-[60%] relative mt-16 bg-blue-50 flex items-center justify-center border  text-blue-600 lg:rounded-b-xl rounded-xl">
          <div className="lg:w-full w-[70%] absolute  font-visita-bold text-blue-600 text-xl rounded-t-xl -top-10 h-10 flex items-center justify-center bg-blue-200">
            <h1>Card Password</h1>
          </div>
          <h1 className="font-visita-medium lg:text-xl text-center">
             Card Password Has Been Send To Your Email
          </h1>
          <div
            id="tooltip-light"
            role="tooltip"
            class="inline-block absolute invisible py-2 px-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm opacity-0 tooltip"
          >
            <span className="font-visita-medium" id="copy-tooltip">
              Copy Manage Link
            </span>
          </div>
        </div>

      <div className="flex flex-col rounded-3xl border px-12 py-12 mt-10 bg-white">
      <div className="flex flex-col items-start">
       <span className="lg:text-xl text-sm font-visita-medium" >1. Go To <br /> <a href={manage_card_url} className="text-blue-600 " >{manage_card_url}</a></span>
        <span className="lg:text-xl text-sm font-visita-medium mt-4" >2. You'll be asked to enter a password</span>
        <span className="lg:text-xl text-sm font-visita-medium mt-4" >3. Then enter the card password you have send to your email</span>
       </div>

       <div className="flex z-50 flex-col items-center  ">
          <h1 className="lg:text-xl text-sm text-blue-600 font-visita-bold mb-6 mt-10 capitalize">
         Or
        </h1>
        </div>

        <div className="flex flex-col items-start">
       <span className="lg:text-xl text-sm font-visita-medium mt-6" >1. Go To <a href={base_url} className="text-blue-600 " >{base_url}</a></span>
        <span className="lg:text-xl text-sm font-visita-medium mt-4" >2. And Click On Manage Card Button In The Header</span>
        <span className="lg:text-xl text-sm font-visita-medium mt-4" >3. You'll be asked to enter a password</span>
        <span className="lg:text-xl text-sm font-visita-medium mt-4" >4. Then enter the card password you have send to your email</span>
       </div>
      </div>

      <h1 className="lg:text-lg text-sm font-visita-medium text-slate-400 mt-10" >Any Help? Contact Visita <a href="/support" className="text-blue-600 hover: ml-2 cursor-pointer" >Help Center </a></h1>

      <h1 className="lg:text-lg text-sm font-visita-medium text-slate-400 mt-4" >© Visita - all rights reserved</h1>

       
          </div>

      </div>
      
    </div>
  );
}

export default Successfull;
