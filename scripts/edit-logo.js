import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function editLogo() {
  const zai = await ZAI.create();
  
  // Read the original logo image
  const imageBuffer = fs.readFileSync('/home/z/my-project/upload/bill-by-metodo-logo.png');
  const base64Image = imageBuffer.toString('base64');
  const dataUrl = `data:image/png;base64,${base64Image}`;
  
  console.log('Editing logo: REMOVE cream ring completely...');
  
  const response = await zai.images.generations.edit({
    prompt: "COMPLETELY REMOVE the cream/beige/tan colored ring. The 5 green segments must touch DIRECTLY the white center circle with NO gap and NO cream color between them. Dark green outer border, then green segments extending inward until they touch the white circle with 5S text. Transparent background. Like a pizza slice from crust to center.",
    images: [{ url: dataUrl }],
    size: '1024x1024'
  });
  
  const editedBase64 = response.data[0].base64;
  const buffer = Buffer.from(editedBase64, 'base64');
  fs.writeFileSync('/home/z/my-project/public/5s-logo.png', buffer);
  
  console.log('✅ Logo saved - no cream ring');
}

editLogo().catch(console.error);
