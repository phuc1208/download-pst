const puppeteer = require("puppeteer");
const fs = require("fs");

const filename = "";
const downloadFile = async() => {
    console.log("goto download file function");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on("response", async (res) => {
        if(res.url().endsWith(filename)) {
            const buffer = await res.buffer();
            await fs.promises.writeFile(filename, buffer);
        }
    })

    await page.goto("...") // TODO: masan sharepoint link
    await page.waitForTimeout(3000);
    console.log("enter password");
    // TODO: masan sharepoint password
    await page.type("#txtPassword", "...");
    console.log("submit password");
    await page.waitForTimeout(3000);
    await page.click("#btnSubmitPassword");

    await page.waitForNavigation();
    console.log("download file");

    await page.waitForTimeout(3000);
    // TODO: masan file url
    const fileUrl = "";
    await page._client.send("Page.setDownloadBehavior", {
        behavior: "allow",
        downloadPath: "./"
    })

    await page.goto(fileUrl);
    await browser.close();
}

downloadFile().catch(console.error);