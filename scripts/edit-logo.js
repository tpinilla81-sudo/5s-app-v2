import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function editLogo() {
  const zai = await ZAI.create();
  
  // Read the original logo image
  const imageBuffer = fs.readFileSync('/home/z/my-project/upload/bill-by-metodo-logo.png');
  const base64Image = imageBuffer.toString('base64');
  const dataUrl = `data:image/png;base64,${base64Image}`;
  
  console.log('Making logo with transparent background...');
  
  const response = await zai.images.generations.edit({
    prompt: "Make this a PNG with completely TRANSPARENT background (alpha channel, no white, no black, truly transparent). Keep only the circular green lime logo with 5 segments. In the white center circle put bold dark green '5S' text. The circle must have transparent area around it so the app background shows through.",
    images: [{ url: dataUrl }],
    size: '1024x1024'
  });
  
  const editedBase64 = response.data[0].base64;
  const buffer = Buffer.from(editedBase64, 'base64');
  fs.writeFileSync('/home/z/my-project/public/5s-logo.png', buffer);
  
  console.log('✅ Logo saved with transparent background');
}

editLogo().catch(console.error);
