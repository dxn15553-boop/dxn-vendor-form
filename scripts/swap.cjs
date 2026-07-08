const fs = require('fs');
let content = fs.readFileSync('pages/GanozhiSoap.tsx', 'utf8');

// Normalize line endings to make searching easier
content = content.replace(/\r\n/g, '\n');

// 1. Replace the image with the video
const imgCode = `                  {/* <div className="relative z-10 w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-neutral-800 flex items-center justify-center p-8">
                    <img
                      src="/cosmetics/cosmetics.png"
                      alt="Ganozhi Soap"
                      className="w-full h-full object-contain filter drop-shadow-2xl"
                    />
                  </div> */}`;
const videoCode = `                  <div className="relative z-10 w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                    <video
                      src="/cosmetics/Person_washing_hands_face_202606090916.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover filter brightness-[1.1] contrast-[1.1]"
                    />
                  </div>`;
// Replace image with video using a simple index because spacing might differ slightly
const imgStart = content.indexOf('                  {/* <div className="relative z-10');
if (imgStart !== -1) {
    const imgEnd = content.indexOf('</div> */}', imgStart) + '</div> */}'.length;
    content = content.substring(0, imgStart) + videoCode + content.substring(imgEnd);
} else {
    console.log("Could not find image block to replace");
}

// 2. Swap the columns
const col1Start = content.indexOf('          {/* Left Column: Details & Specs */}');
const col2Start = content.indexOf('          {/* Right Column: Physical Attributes & Image */}');

// The end is before "        </div>\n      </div>"
const gridEndIndex = content.indexOf('\n        </div>\n      </div>', col2Start);

if (col1Start !== -1 && col2Start !== -1 && gridEndIndex !== -1) {
  let col1 = content.substring(col1Start, col2Start);
  let col2 = content.substring(col2Start, gridEndIndex);

  col1 = col1.replace('Left Column: Details & Specs', 'Right Column: Details & Specs');
  col2 = col2.replace('Right Column: Physical Attributes & Image', 'Left Column: Image & Quick Facts');

  content = content.substring(0, col1Start) + col2 + col1 + content.substring(gridEndIndex);

  fs.writeFileSync('pages/GanozhiSoap.tsx', content);
  console.log('Done!');
} else {
  console.log('Could not find boundaries!', {col1Start, col2Start, gridEndIndex});
}
