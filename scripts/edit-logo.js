import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function editLogo() {
  const zai = await ZAI.create();
  
  // Read the original logo image (with B)
  const imageBuffer = fs.readFileSync('/home/z/my-project/upload/bill-by-metodo-logo.png');
  const base64Image = imageBuffer.toString('base64');
  const dataUrl = `data:image/png;base64,${base64Image}`;
  
  console.log('Editing logo: transparent background + 5S text...');
  
  const response = await zai.images.generations.edit({
    prompt: "Two changes: 1) Make background completely transparent (remove black square). 2) Change the letter B in the center to bold '5S' text. Keep the circular green lime design with 5 segments, white center circle, cream dividers, dark green outer ring. Final result: clean circular logo with 5S in center, NO background.",
    images: [{ url: dataUrl }],
    size: '1024x1024'
  });
  
  const editedBase64 = response.data[0].base64;
  const buffer = Buffer.from(editedBase64, 'base64');
  fs.writeFileSync('/home/z/my-project/public/5s-logo.png', buffer);
  
  console.log('✅ Logo saved (transparent + 5S)');
}

editLogo().catch(console.error);
