import { useState } from "react";

const Img = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  async function bgRemove(file) {
    const image = new FormData();
    image.append("image", file);

    const url = "https://api-bgrm.hsingh.site/remove_background";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: image,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      imageGet(data.id);

      setTimeout(async () => {}, 14000);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function imageGet(data) {
    console.log(data);
    const realShit = await fetch(
      "https://api-bgrm.hsingh.site/get_result?id=" + data
    );
    const ress = await realShit.json();
    if (ress[0].status != "completed") {
      setTimeout(function() {
        imageGet(data);
      }, 2000); 
    }
    else{
      setResult(ress[0].image_url);
    }
    
  }

  function ImageHandle(event) {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      bgRemove(file); // Pass the file object directly
    }
  }

  return (
    <>
      <input
        placeholder="Enter Image file here"
        type="file"
        onChange={ImageHandle}
      />
      {result && <img src={result} alt="Result Image" />}
    </>
  );
};

export default Img;
