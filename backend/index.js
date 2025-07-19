import express from 'express';
import { fal } from "@fal-ai/client";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 5000;

const length = 3;
const words = ["fire", "water", "earth", "air", "light", "darkness", "human", "animal", "machine", "nature", "magic", "technology", "mosnter", "hero", "villain", "quest", "adventure", "battle", "peace", "war", "love", "hate", "friendship", "betrayal", "courage", "fear", "wisdom", "knowledge"];
function randomPrompt(){
    let prompt = words.sort(() => Math.random() - 0.5).slice(length).join("-");
    return prompt;
} 

fal.config({
  credentials: "c4fab6af-19b4-4060-9e5f-9ea5a80fa2b8:e6530eff116c0293ec4d32135ee6ccde"
});
function generate(prompt) {
    return fal.subscribe("fal-ai/flux/schnell", {
    input: {prompt: prompt}, 
    logs: false,
    });
}

const exploreAmount = 3;
async function explore(){
    let inputs = [];
    for (let i = 0; i < exploreAmount; i++) {
        inputs.push(randomPrompt());
    }
    let outputs = [];
    for (let i = 0; i < inputs.length; i++) {
        outputs.push(generate(inputs[i]));
    }
    let results = await Promise.all(outputs);
    for (let i = 0; i < results.length; i++) {
        results[i] = results[i].data.images[0].url;
    }
    return results;
}

// Handlers of HTTP requests

const publicUrlsPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'frontend', 'public', 'urls', 'urls.json');
app.get('/api/generate', async (req, res) => {
    try {
    let urls = [];
    let exploreResults = await explore();
    for (let result of exploreResults) {
        urls.push(result);
    }
    await fs.writeFile(publicUrlsPath, JSON.stringify(urls, null, 2));
    res.send("okay");
    } catch (err) {
    console.error("Error in /api/generate:", err);
    res.status(500).send("Internal server error");
   }
   });
   
app.listen(port);