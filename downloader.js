const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const snaptik = require('snaptik-downloader'); // Hypothetical Node.js library for TikTok download

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function runCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Command failed with error: ${stderr}`);
            return;
        }
        console.log(`Command Output: ${stdout}`);
    });
}

function getNextNumber(directory, prefix) {
    const files = fs.readdirSync(directory);
    const numbers = files
        .filter(file => file.startsWith(prefix) && /^\d+$/.test(file.slice(prefix.length, -4)))
        .map(file => parseInt(file.slice(prefix.length, -4), 10));

    return (Math.max(...numbers, 0) + 1) || 1;
}

function downloadYouTubeVideo() {
    rl.question('YouTube URL: ', youtubeUrl => {
        const baseDownloadDirectory = path.join('C:', 'Users', 'elfar', 'Videos', 'Videos Youtube');

        if (!fs.existsSync(baseDownloadDirectory)) {
            fs.mkdirSync(baseDownloadDirectory, { recursive: true });
        }

        const command = `yt-dlp --merge-output-format mp4 -f "bestvideo+bestaudio[ext=m4a]/best" -o "${path.join(baseDownloadDirectory, '%(title)s', '%(title)s.%(ext)s')}" ${youtubeUrl}`;
        runCommand(command);

        rl.close();
    });
}

function downloadTikTokVideo() {
    rl.question('TikTok URL: ', async (tiktokUrl) => {
        try {
            const baseDownloadDirectory = path.join('C:', 'Users', 'elfar', 'Videos', 'TikTok Videos');

            if (!fs.existsSync(baseDownloadDirectory)) {
                fs.mkdirSync(baseDownloadDirectory, { recursive: true });
            }

            const nextNumber = getNextNumber(baseDownloadDirectory, 'video_');
            const filePath = path.join(baseDownloadDirectory, `video_${nextNumber}.mp4`);

            const video = await snaptik(tiktokUrl);  // Assuming snaptik provides a promise-based API
            video.download(filePath);
            console.log(`Video saved to ${filePath}`);
        } catch (error) {
            console.error(`Failed to download TikTok video: ${error.message}`);
        } finally {
            rl.close();
        }
    });
}

function main() {
    rl.question('Choose platform (YouTube/TikTok): ', (choice) => {
        choice = choice.trim().toLowerCase();

        if (choice === 'youtube') {
            downloadYouTubeVideo();
        } else if (choice === 'tiktok') {
            downloadTikTokVideo();
        } else {
            console.log("Invalid choice. Please choose 'YouTube' or 'TikTok'.");
            rl.close();
        }
    });
}

main();
