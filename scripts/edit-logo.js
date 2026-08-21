import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function createLogo() {
  const zai = await ZAI.create();
  
  // Read the original logo image
  const imageBuffer = fs.readFileSync('/home/z/my-project/upload/bill-by-metodo-logo.png');
  const base64Image = imageBuffer.toString('base64');
  const dataUrl = `data:image/png;base64,${base64Image}`;
  
  console.log('Creating logo with TRANSPARENT background...');
  
  const response = await zai.images.generations.edit({
    prompt: "Keep this exact circular green lime logo with 5S text in center. Make background COMPLETELY TRANSPARENT (alpha channel, no white, no color). The green segments must extend to touch the white center circle with 5S text. Clean transparent PNG logo.",
    images: [{ url: dataUrl }],
    size: '1024x1024'
  });
  
  const editedBase64 = response.data[0].base64;
  const buffer = Buffer.from(editedBase64, 'base64');
  fs.writeFileSync('/home/z/my-project/public/5s-logo.png', buffer);
  
  console.log('✅ Logo saved with TRANSPARENT background');
}

createLogo().catch(console.error);
