import React, { useState } from "react";
import "./IMG.css";
import CheckPoint from "../DropBox/CheckPoint";
import Prompt from "../Prompt/Prompt";
import NegativePrompt from "../Prompt/NegativePrompt";
import Generate from "../Button/Generate";
import IntergrateCLIP from '../Button/IntergrateCLIP';
import DeepBooru from '../Button/DeepBooru';
import SamplingMethod from "../DropBox/SamplingMethod";
import SamplingStep from "../Slider/SamplingStep";
import RestoreFaces from "../CheckBox/RestoreFaces";
import Tilling from "../CheckBox/Tilling";
import Width from "../Slider/Width";
import Height from "../Slider/Height";
import BatchCount from "../Slider/BatchCount";
import BatchSize from "../Slider/BatchSize";
import CFGScale from "../Slider/CFGScale";
import Seed from "../Slider/Seed";
import Script from "../ForScript/Script"; //Alwayson scripts
import axios from 'axios'; 
import { NavLink } from "react-router-dom";
import ResizeMode from "../DropBox/ResizeMode"; 
import DenoisingS2 from "../ForHireFix/DenoisingS2";
import ForScript from "../ForScript/ForScript";
import ImageUploader from "../imgjson/ImageUploader";

function ImgPage() {
  const [isHiresChecked, setIsHiresChecked] = useState(false); // Initialize with the default value (false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [imgData, setImgData] = useState({
    init_images: ["/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgVFRUYGBgYGhoZGBgYGBgYGBgaGBoaGhgYGRgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGhISGjQkJCs0NDQ0NDQ0NDE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0NDQ0NDQxNDQ0NDQ0NDQ0NDQ0NP/AABEIAK8BHwMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAABAgADBAUGB//EAEAQAAICAAQDBgMGBAQEBwAAAAECABEDEiExBEFRBQYiYXGBkaGxBxMyQtHwUnLB4SMzYvGCkqLTFBUXNENT0v/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAIBEBAQEBAQEAAgIDAAAAAAAAAAERAhIhMVEDYSIyQf/aAAwDAQACEQMRAD8A9YiNGJimAkhMAMlyKskiwkzSIYjRjKHJzDpRP7+MILGJIxi3Cmz617xrlKqAbH7r/ePc0gmIYbiEwGDRs0SSBYJIoMa5A0MW4bgGGLJAYxTITFJkVIwiXGEgcSXFENygiFBFhBgWgwysGNcB7huJclyByZAYtwgwGMRtoxiNtAQSQCAGRVoMBMAgJm0EmVsdIWMDGEYuJiUZFa4mEgtjW7He/wCstCDpMxUgzR8o6QgDoJrUxWryM0uAHQfCSvIRKYpDQgxyg6CEIOg+EaYTNCDHyjy+EIWTTFdxrhyeQhyjoPhGqAMlyZPISV6RphWaLmlhA6CBUA5SUJcNyyoCvpIAGhuQqOghAHQS6JcFx8o6D4SZR0HwjQVMhkyjoIGUdBGhljStfSP7RoIEYSuh0jr6SCwyvElhMpcy0LJcFyRA1wEyXFJmkKz61++UVmgbe+l/Ov0leKdDKCGuMsQQqZA8Ii3IDAsEJiAw3AMlwGS5FGNFuS4DXJcW5LgMZLi3DcCM1CzsNTEwsRXGZWDDqpBHxExu13IwMQjcI30nMdlcQyAOhoncE6MOlTn135smN88epuu1uC5jcJxa4i5l9xzB6S250n2bGPx8WEwZqiFpg43EBzlB8I38z+kx115jXPOszC4pXYqt6C75H05zIuajgXJxm6BPqR+k2gMnNtn06klWAw1FWMJplIZJBAMYRYymBDKXMtYyhzLQpMNxSZLiBriM0hMrZpqM0GbX9+UGIdICYrvpKhgbjAylDoI4MNLLkuJcIMBwYbigyXAa5Li3IDIHuEGJmkuBZcFxQ0maAxaDNFJguMFPaeY4OIFqzhvV7XlNTz/A7Uyf4KAs43BsAep2E9CxsSlJPIE/CeXpw7DFxMTMLcA5ANFF3V3t+k4/zT7K7fxdfLFmNxLqzDPTHUZC2YEUdGHM/u5qeN417anxDR3dyRdAkDXWi3zm1fgsUGkQm1Zs17MFLAC/PlXOYS8K74QtTmcYbtd3mbMX6kV4BXRamOeryvU9Lez8Z2f8b5VYNqxK6KpXQ7i7HqJ1+BxZRMwOYak9V9RU5xODxTiqyLYdXDUNAuEA2EteZdtT1m54BnVQzoFJ0pWzi+hNfGZ7tt1eJkxu+7/E/eXiLohFbVbA/p9fKb1TOY7pWqOpB/GSpPNTqJ0iGd/4/wDWOf8AJf8AK4yAYwMqUywTTB4YlwkwDcMWS4EZtalTmOdzKnMUKxikwM0rL7ywp2aVM81/anayYK5nYATlOL72u+mCm/5iL9wP1qdMybWN25Hbs8oxuNRfxOg8iwB+E86xu0sd/wAWKT5B8guuYQfK5iJw5Ykkozcw7s2501q5m9RfNejr29wxH/uMPTfxrp666Sxu2MAAE42HR2OddfnPMwihwjhkOtClZCfIlf02lj8DT0Qubfw7MNLOUncX7yeoY9CfvDww/wDlU9Mtt9BMd+9vDAAh2a+iN+k89VArUy6ciaFH+Enn/aZfCqC4zLVDYjfX09PjHpcdyvenAq6cjqEJB+EZO9XDnfOP5sNx/Scs2EqYigUM1gAaUQL0rQ/3kxlDstABddfQ9Zn0vl1bd48Iflev4spr1iDvTg3s9dchI122nNvxSoDzrStT5HaVJh5V1XKCdN9L5mvePR5dkneDAus9H/UrD6iZWF2lhP8AhxEP/EL+s4A4aKlOST666Veo5aiMcNPDpvQCmyG58/38I9Hl6OMQdYRiTznAdtSGKAEgpqOe++h32lWN2g+R1XFfS9czAjpWvLX4S+oea9GxOJRfxMo9SB9ZquP7y8PhnKXDN/ChzH0NaD3nk3HPnKh2Zyd2cljXPU+nLrH4LABvIVzA7Hahpt84vROXZdqdv4mKKXwIdKBB5iwx8pqMTszExC2ewKLKMN2Bc9Cw19vOY/CKTaOCymqytqDW6k+tUZllK1GK6qviJBAK/wA6HUeo0PlPP31bdd+ZMwmHxWGHCoGw3J1Vg6gkCtHHiXYEiiL10ubDguN+8UDEoYiMyOV2coSA425GBcFwjYjH7xzWUtVV5AKK+E1+PwLofvjphNQYj8jG9XHQmhYvcTna6c8/W57T7RJf7pMqomHndmz+N3ahQUHNlA28/KLwaJjsQoYOSGLoDh5copQFBvL1zHW9qoQ8B2diYWV3W2Y2AdSqUPC1bG+Ws3mNwJTxYZZK8QUHwHbwuNNN5NSyas7tFsjBwVYGipGxG5B5g7zoEmt4RyRmYUTy6cgJsUM9XH4jz9flepliypTLBNsmhEAEMgJkkkEClnPivlt+nylTmRtj8z/eVO5C670L5awpXeYfEcSFUknbUyjje0FQGyBON7b7cOKDh4TBV/O1jMR0UdOpmuf3Wb+mo7Y7QOPilywKIaQch1Om8pNnkzdQNBr1O59ZQ/DhCADYOlb+++ntLUZiaBPso+Rupnq7WuZizCwr0KrX8IQsOX5jp+/OZZ7Pzi1RFPLMADpztWsH2mKyugzfcM4HN2T5KLlvZ3a/DYpCPhIjm6BVSD5BqkVcxLKUxUfD5ByAyeWpG59feZCPQCYlZkPhdd1vbNeq3R11Eo45XwRnwWtB+PBY51K8yl6g6bAylXGOBi8Oj2pCkKrFChPiXaq5iukx1VnLb4WHhuCHBYMKo9RuSK32122io/3fgu0ogaa1uPFzo1KDhuKOQrtdrXqbPQSMCTZbNvZBv9mYvVxucxitieENZIZwVBsFetXqBpfuZOD40W4B0s+muvTSXM4ckZCCBY5CgOtVuJqnwm8WQakgHUkE7HT3I945ulmNzw2IEQZtTpZ119faZfE8aoQbeLQf7X+9Zo8G8pDdRQ3205S/iccDKx1GwoHn9ZqVMbjhyqoAd9z8tPSU4TZzZ/CtkUd9R03/ALSnNahvlRHKv6wcOSCQNq2841MNiYmdr1y3tdXWnvOf7Y4sISqHU3Y2P72mwd2COVsMCbvSr3rlU5Xj7D72T8b56zUmpbjJwVz/AJqI5AXZ5es2eBwuTxM6qTyUMxNabLV/7zH7ITQkDxbWxyqB1J/3m54F1VcuGrOSbJrKl9QTy05XLUicNxKHTOFJPNCA3up0Pr5TPxHy0VC3/HvlvkW5g6dPeVL96fA54cA7oznUHnmrQ+o5D2rfgstnCbOhrOisHy6/lKk6g7+Q8py6dOS4PGujhCSUfxCwAVbmtDTT4+dzfooxkyM5CGtqW6IO80eLwmZCGzKQQyuFNqeqmvKqmRwfDuaGvqaAHt+95jb+m/jssN0VazF622+sq+8LtbEHoB+X0PP3mswuD0ovlHM3Q9hMrhMdLyriIxHIMPpNcy2/Werk+NxgzLQzCwmAmWpno5cKyUMtWY+cDcgTH/8AOMAbYincUps2ND89LOlmS9SflZLWzUxqmkfvDghgiuuc2adwqLl3zOLF+QuDsrvXw2O7YQxUDoaPiORv5HYLm9K5HfeSdRfNbuGMViiaZa7inpG9PrMHtXisikzJ4ghvAdmVr9BQ0/5pzfefGJUgTQ4ntTtpsR2UagHKda19Nz/aY2HxlrprR5jT2O9DymGeMB8NhFF2uviIPizEa78ulzYdlujmqBA11A+HkP0meuv+tSMfDwi9tnAGozEkc9ed3+kTisR+HOYEMnNgoY67XdmvMGbrH4f76ksIoOhVNVIOmVQNuUdOEceBlVxtqoGa66addK085zvcn5anOj2bxq4yZlINGiBrWnTce81PePscH/GQ5HGpHX9DNtwPc91xVfBfIh1ZCLq9co8vWds3dnBxFrEVm8g7IP8ApImZbbsWySZXkXD9tYpUeMbUSaJ1rlMkdsYtf5jGuhIHy0npafZ72fywWHX/ABcWz/1xcT7POCrwo6nr947fJiRN4zOnnK9vYqro5FDRqN/Hr6zT4OO+NjKr4rsGPiOc7AEmr02BnpXan2do61h4hUjbMoYH1qpyz9xeLwXDoqPlOgVt9CNmrr1iYXWnbiX4fEKElwxGQtisoUeZGxm+7Px3JGHi5c7AsjobVwpsg6CnAO/Ous53iuzMUOWxkbMD/lujgMOiEDU+k6Tuz3PxMTFGI+CeHQLoAQWYkaMAbo68wKi5hN04db0IrYdNuvvUrwnGJa/DqB5Ts+H7iYQQIMTEoG78Fk8yTX0l2F3FwlsjExNfJf6CTyenFvxGVggG2+9D3Pw9plJxIB1rpQ6zpj3ES7GO/plU36neLidwwxFcSwr/AEDXyOsl5qzqObxADZ0AIJN635eU5bjMMmgavUC9wLOXf2np57ktVDHW+pwz/wDuYGN9njNr/wCJA1sf4R0OvPPHMsp1ZY4/hcijJqcpN75QbvX+NtvIecTtXtPEd1wUOTNuV0peY8hoZ12H9m7rYHFr0N4LUR/zyp/syxC5ccWgJFf5TXp55/KdGHK9oLh4CKUTM5IC2d2668/7RE4p0zM7szKoYqSQi3sAu3Lczusb7P3ZkY46HIb1RunLxaf2lP8A6eYhbFL4yMMQVWVvDW2pJuTF1zvCdo4yYJ4jFxDdWF/KoOyheZMHC9qcSXQMBkK532Gh5bab7CdX2l3GxMXCGGMRBqtnxDRSNhW8uTuXiBrz4YFBVADWANrNam/pJn9L6czxY+8Pjd0X+Ealh5kbfCPwT4aJlwFVHIouQXa65tz9tJtON7ncYxNYmCQTQBZ6y+dIfOa5+4naO4xOFF9HxP8Atyeaeoq7K7JxVx/vMbiVehYVnJ8R55NuU6kdqviCsPESxpRs7bznMPuJ2jYJxOHGXmrOSTy0KCV8J3G7TwyzDEwcxJa87m2P/B1/rGdftfXLE7b7ax0fER2bQitTtR09N9pzXDcU4fKCy6gEbt7X6z0Ve43E4pzY7oDlCnIc10P9QH7MC/Zml5mfEJsaqUFV/MTLn9Jv9tK3AJj8GMYPlxkLhyDRYAmswPhGmXavrMfupxGImGyYXDJjMRbM+UhLJ1105fKdJj9xMU4bYSY2JkdszI/3TZjYJ8QKlQSAdJb2Z9nIV0Zx4Bq6Z1YPX5QNKUneyekz5rXqOu7o8Y2LwiMwNi1sm8wU1mB5jejzqbioEwwFCqoUKAAoqgBsABsIyrOkmTHO3a0Lt4j5KK9yb+g+E57tUBjrtr9J0LDfr+/1M0fHLqZer8XmfXmvaHAZOIcAatRXTkVBYjqd/nKOx0dMRloqpOnnrqJ33ebsvPgq6KC6ZSvmBWZdOouecYnaosabMbBsk367aGqmfzFdnh4yN+BgxHRtB10HpN/wlOFYVrqT1O08z7I4k4L5wCwblVkg6ivh8jO37D7fwncYQBsjN4dQPUbicup9bldpwiVNghmDwzdJmoZ255yOVu1crRwZWssEuIOWVthCWyVJYusc4AhTCEvqECScroKsepBDNYylSGSQwK2EZUkCwgSYuoFhCxhDGIGWTLDJLgmWTLDJIFVIcghEMABJMgjSRhpQkBw48kYF+7EmQRxIIwKUkCR5IwaGt/Qf1mvxcKyZsdifYfU/rMd0irFDp/Sebd7e6xTGGNhreG1FwPyld/Yj6T1ApK3wgRRFyX4sryZuHtKTwkC1YHUE3Vj3Pxmt7N4j7o5wXcsRnXI2e+ZBqjXrOm71938TAVsbA8WGt2nNFb8VeQPwB8pxvB8U4BZmJHQ1TevWTNi79eu9zu0nx8Iu6FFLf4dkEslaE1OoR54z2J33xMFwMTxpewAtByy1Xwnq3ZvHJiorowZWFgj97zpzMmMdX63CGWqZjYbS9ZUWCQQQyKaQRY0AwwSRQZDBJAgEIigxhIDcMWGUG5IJAYDQiLcMgMMEMAiQyCQwJUkAMNwII0WGAZJJBA0aizfl8/2TIVhQ7yAzNVWVgKSytpAJUY74d6Tk+2e5GBjEFQcM88lAHp4drGk7QrFKSNPCe3+6fEcJ4mXPh/8A2IDQ/nG6fTzm/wDss4p/vnwxqhXOegYEAEHqf6T1Y4fKoOH4VE0RFUdFAH0mpWauwZkrKkEtWaRYJJIagEQSSQGkkkkUYDDAYQBGEAhgGGCSBIRBJAaSCGFGERYwMgIhMAhgLDJUgEAiSCGARDAIYGkTn6/pAeUYbe5+plQOokv5WLDJITBNYg3JBGEmA1CJBIIwWJLBK0jiaQ4hBiwXAsBhuVgw3AsguLcW5A8hMFwXKHEIigxhAaSAwXIGkuASXCmki3DIGhiAxwYDQ3FiwHuCAGS4DCGooMYGAZIpaDNA/9k="],
    resize_mode: 0,
    denoising_strength: 0.75,
    mask_blur: 4,
    inpaint_full_res: true,
    inpaint_full_res_padding: 32,
    inpainting_mask_invert: 0,
    initial_noise_multiplier: 0.93,
    prompt: "A cat",
    styles: [],
    seed: -1,
    batch_size: 1,
    n_iter: 1,
    steps: 20,
    cfg_scale: 7,
    width: 512,
    height: 512,
    restore_faces: false,
    tiling: false,
    negative_prompt: "",
    eta: 0,
    override_settings: { sd_model_checkpoint: "sd-v1-5-inpainting.ckpt [c6bbc15e32]" },
    sampler_index: "Euler a",
    include_init_images: false,
    alwayson_scripts:{"lora":[0]}
  });

  // 轉換字形
  function camelCaseToSnakeCase(input) {
    return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
  }
  const handleHiresCheckboxChange = (value) => {
    setIsHiresChecked(value);
    }; 

  const handleFormDataChange = (fieldName, value) => {
    setImgData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  
    // 查看更新
    console.log(`Field ${fieldName} updated to:`, value);
    console.log(imgData);
  };
  
  const handleGenerateClick = () => {
    const confirmed = window.confirm("确定要提交吗?");
    if (confirmed) {
      // 轉換數據請求
      const requestData = {
        method: "POST",
        request: Object.keys(imgData).reduce((acc, key) => {
          acc[camelCaseToSnakeCase(key)] = imgData[key];
          return acc;
        }, {}),
        response: {
          message: "傳輸成功",
        },
      };
      jsonFunction(requestData);
    }
  };

  async function jsonFunction(imgToImgData) {
    try {
      await axios.post("https://localhost:8080/api/img2img/process", imgToImgData.request);
      alert("轉換成功");
    } catch (error) {
      console.log("數據出錯:", error);
    }
  }

  return (
    <div className="IMGcontainer" style={{padding:20}}>
     
      <div className="img2img-title-grid">
        <div className="txt2img-InstAI-Icon" >
          <img src="/img/instai_icon.png" alt="instai" style={{height:100}}/>
        </div>

        <div className="img2img-section1">
          <div className="NavStyle">
            <span>
              <NavLink to="/TXTtoIMG">
                <button>TxtPage</button>
              </NavLink>
            </span>
         </div>
        </div>

      </div>



      <div className="img2img-first-grid">

        <div className="grid-line"></div>

        <div className="img2img-section2">
          <div >
            <CheckPoint value={imgData.override_settings.sd_model_checkpoint} onChange={(value)=>handleFormDataChange("override_settings.sd_model_checkpoint",value)} />
           </div>
        </div>

      </div>
 
      <div className="img2img-second-grid">

        <div className="img2img-section3">
          <div className="PromptStyle">
            <Prompt value={imgData.prompt} onChange={(value) => handleFormDataChange("prompt",value)} />
          </div>
        </div>

        <div className="img2img-section4">
          <div className="ButtonStyle">
            <IntergrateCLIP />
          </div>
        </div>

        <div className="img2img-section5">
          <div className="ButtonStyle">
            <Generate onClick={handleGenerateClick} />
          </div>
        </div>

        <div className="img2img-section6">
          <div className="PromptStyle">
            <NegativePrompt value={imgData.negative_prompt} onChange={(value) => handleFormDataChange("negative_prompt",value)} />
          </div>
        </div>

        <div className="img2img-section7">
         <div className="ButtonStyle">
              <DeepBooru />
           </div>
        </div>
      </div>

      <div className="img2img-third-grid">

        <div className="img2img-section9">
          <div className="DropBoxStyle">
            <ResizeMode value={imgData.resize_mode} onChange={(value) => handleFormDataChange("resize_mode",value)}/>
          </div>
        </div>
     
      <div className="img2img-fourth-grid">

        <div className="img2img-section10">
          <div className="DropBoxStyle">
            <SamplingMethod value={imgData.sampler_index} onChange={(value) => handleFormDataChange("sampler_index",value)} />
          </div>
        </div>

        <div className="img2img-section11">
          <div className="SliderStyle">
           <SamplingStep value={imgData.steps} onChange={(value) => handleFormDataChange("steps",value)} />
          </div>
        </div>

    
      </div>

      <div className="img2img-fifth-grid">
        <div className="img2img-section12">
          <div className="CheckBoxStyle">
            <RestoreFaces value={imgData.restore_faces} onChange={(value) => handleFormDataChange("restore_faces",value)}/>
          </div>
        </div>

        <div className="img2img-section13">
          <div className="CheckBoxStyle">
            <Tilling value={imgData.tiling} onChange={(value) => handleFormDataChange("tiling",value)} />
          </div>
        </div>

      </div>

      <div className="img2img-sixth-grid">

        <div className="img2img-section14">
          <div className="SliderStyle">
            <Width value={imgData.width} onChange={(value) => handleFormDataChange("width",value)} />
          </div>
        </div>

        <div className="img2img-section15">
          <div className="SliderStyle">
            <BatchCount value={imgData.n_iter} onChange={(value) => handleFormDataChange("n_iter",value)} />
          </div>
        </div>

        <div className="img2img-section16">
          <div className="SliderStyle">
            <Height value={imgData.height} onChange={(value) => handleFormDataChange("height",value)}/>
          </div>
        </div>

        <div className="img2img-section17">
          <div className="SliderStyle">
            <BatchSize value={imgData.batch_size} onChange={(value) => handleFormDataChange('batch_size', value)} />
          </div>
        </div>

      </div>

      <div className="img2img-seventh-grid">

        <div className="img2img-section18">
          <div className="SliderStyle">
            <CFGScale value={imgData.cfg_scale} onChange={(value) => handleFormDataChange("cfg_scale",value)} />
          </div>
        </div>

        <div className="img2img-section19">
          <div className="SliderStyle">
            <DenoisingS2 value={imgData.denoising_strength} onChange={(value) => handleFormDataChange("denoising_strength",value)} />
          </div>
        </div>

        <div className="img2img-section20">
          <div className="PromptStyle">
            <Seed value={imgData.seed} onChange={(value)=>handleFormDataChange("seed",value) }/>
          </div>
        </div>

        <div className="img2img-section21">
          <div className="DropBoxStyle">
            <Script onChange={(value) => handleHiresCheckboxChange(value)} />
              {isHiresChecked?(<div>
                <ForScript value={imgData.alwayson_scripts} 
                onChange={(value)=>handleFormDataChange("alwayson_scripts",value)}/>
                </div>):null}
          </div>
        </div>

        <div className="img2img-section22">
           <div>
            <ImageUploader value={imgData.init_images} onChange={(value)=>handleFormDataChange("init_images",value)}/>
           </div>
        </div>

        </div>
      </div>
    </div>
  );
}

export default ImgPage;

