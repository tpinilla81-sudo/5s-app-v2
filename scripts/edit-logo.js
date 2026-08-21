import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function editLogo() {
  const zai = await ZAI.create();
  
  // Read the original logo image
  const imageBuffer = fs.readFileSync('/home/z/my-project/upload/bill-by-metodo-logo.png');
  const base64Image = imageBuffer.toString('base64');
  const dataUrl = `data:image/png;base64,${base64Image}`;
  
  console.log('Editing logo: changing B to 5S...');
  
  const response = await zai.images.generations.edit({
    prompt: "Change only the letter B in the center circle to text '5S', keep everything else exactly the same - the circular green lime design with 5 segments, white center circle, dark green outer ring, cream colored dividers. Only replace the B with bold green 5S letters.",
    images: [{ url: dataUrl }],
    size: '1024x1024'
  });
  
  const editedBase64 = response.data[0].base64;
  const buffer = Buffer.from(editedBase64, 'base64');
  fs.writeFileSync('/home/z/my-project/public/5s-logo.png', buffer);
  
  console.log('✅ Logo saved to /home/z/my-project/public/5s-logo.png');
}

editLogo().catch(console.error);
