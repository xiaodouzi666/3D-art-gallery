
async function fetchFromWukongHuaHua(style, desc) {
    let response = await fetch('https://xihe.mindspore.cn/api/v1/bigmodel/api/wukong', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': '23cd2ad70515287fdb06f85b1a1bf0ad54a4267e695e92ca91a5b08a9f6dec0c015b7e853afc93672ef8cfecbec8ae'
        },
        body: JSON.stringify({
            "style": style,
            "desc": desc
        })
    });
    
    let data = await response.json();
    return data.data.pictures[0];
}
import * as THREE from 'three';

import { paintingData } from './paintingData.js';

export function createPaintings(scene, textureLoader) {
 
  let paintings = [];

  paintingData.forEach((data) => {
   
    
    const style = prompt("请输入图片风格描述 (e.g., 赛博朋克): ");
    const desc = prompt("请输入图片描述 (e.g., 城市夜景): ");
    const imgSrc = await fetchFromWukongHuaHua(style, desc);
    
    const painting = new THREE.Mesh( 
      new THREE.PlaneGeometry(data.width, data.height),
      new THREE.MeshLambertMaterial({ map: textureLoader.load(data.imgSrc) })
    );

    painting.position.set(data.position.x, data.position.y, data.position.z); 
    painting.rotation.y = data.rotationY; 

    
    painting.userData = {
      type: 'painting', 
      info: data.info, 
      url: data.info.link
    };

    painting.castShadow = true; 
    painting.receiveShadow = true; 

    paintings.push(painting); 
  });

  return paintings; 
}
