import { DataProducts } from "@/domain/usecases";
import puppeteer from "puppeteer";

export class HttpDataProducts implements DataProducts {
  async getDataProducts(params: any): DataProducts.Result {
    const { url } = params;

    // const browser = await puppeteer.launch({
    //   executablePath: "/usr/bin/google-chrome",
    //   args: ["--no-sandbox"],
    // });

    // const browser = await puppeteer.launch({
    //   headless: false,
    // });

    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(url);

    const dataLinks = await page.$$eval("a", (as) => as.map((a) => a.href));

    const infos = await page.evaluate(() => {
      const infoProducts = document.querySelectorAll(
        ".col-md-9 .row .thumbnail"
      );

      const products = [...infoProducts].map((el) => {
        return {
          description: el
            .querySelector(".thumbnail .description")
            ?.innerHTML.replace(/\t/g, "")
            .replace(/\n/g, ""),

          link: el
            .querySelector(".thumbnail .caption")
            ?.innerHTML.replace(/\t/g, "")
            .replace(/\n/g, "")
            .split('</h4><h4><a href="')[1]
            .split('" ')[0],
        };
      });
      return {
        products,
      };
    });

    // await browser.close();

    const resolvePromisesSeq = async (tasks: any) => {
      const results = [];
      for await (const task of tasks) {
        results.push(task);
      }
      return results;
    };

    const data = infos.products.map((data) => {
      const hrefLenovo = data.link;

      if (data.description?.match("Lenovo")) {
        const links = dataLinks.filter((str) =>
          str.includes(`https://webscraper.io${hrefLenovo}`)
        );

        const result = links.map((element) => {
          return element;
        });

        return result;
      }
    });
    const filteredData = data.filter((x) => x !== undefined);

    const newArray = filteredData.flat();
    // ------------------------------------------------    FUNCIONA ATE AQUI -----------------------------------------------------------

    // ------------------------------------------------    ZONA PRA ACHAR O LOOP CERTO -----------------------------------------------------------
    const a = newArray.map(async (element) => {
      console.log(element);
      if (element) return await page.goto(element);

      // page.goto(element);
    });

    console.log(a);

    // if (a) await page.goto(a);

    // ------------------------------------------------    ZONA PRA ACHAR O LOOP CERTO -----------------------------------------------------------

    // ------------------------------------------------    FUNCIONA ATE AQUI ----------------------------------------------------------
    const dataProductsPup = await page.evaluate(() => {
      const infoProductsLenovo = document.querySelectorAll("body .wrapper");

      const products = [...infoProductsLenovo].map((el) => {
        return {
          name: el
            .querySelector(".wrapper .container.test-site .row .caption")
            ?.innerHTML.replace(/\t/g, "")
            .replace(/\n/g, "")
            .split('title="')[1]
            .split('">')[0],

          price: el
            .querySelector(
              ".wrapper .container.test-site .row .caption .pull-right.price"
            )
            ?.innerHTML.replace(/\t/g, "")
            .replace(/\n/g, ""),

          description: el
            .querySelector(
              ".wrapper .container.test-site .row .caption .description"
            )
            ?.innerHTML.replace(/\t/g, "")
            .replace(/\n/g, ""),

          reviews: el
            .querySelector(".wrapper .container.test-site .row .ratings")
            ?.innerHTML.replace(/\t/g, "")
            .replace(/\n/g, "")
            .split('<p class="pull-right">')[1]
            .split("</p>")[0],

          rating: el
            .querySelector(".wrapper .container.test-site .row .ratings")
            ?.innerHTML.replace(/\t/g, "")
            .replace(/\n/g, "")
            .split('data-rating="')[1]
            .split('">')[0],
        };
      });
      return products;
    });

    console.log(dataProductsPup);

    await browser.close();

    return params;
  }
}
