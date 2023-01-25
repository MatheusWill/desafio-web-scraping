import { DataProducts } from "@/domain/usecases";
import puppeteer from "puppeteer";

export class HttpDataProducts implements DataProducts {
  async getDataProducts(params: any): DataProducts.Result {
    const { url, filter } = params;

    // const browser = await puppeteer.launch({
    //   executablePath: "/usr/bin/google-chrome",
    //   args: ["--no-sandbox"],
    // });

    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(url);

    const infos = await page.evaluate(() => {
      const infoProducts = document.querySelectorAll(
        ".col-md-9 .row .thumbnail"
      );

      const products = [...infoProducts].map((el) => {
        return {
          name: el
            .querySelector(".title")
            ?.innerHTML.replace(/\t/g, "")
            .replace(/\n/g, "")
            .replace("...", ""),

          price: el
            .querySelector(".pull-right.price")
            ?.innerHTML.replace(/\t/g, "")
            .replace(/\n/g, ""),

          reviews: el
            .querySelector(".ratings .pull-right")
            ?.innerHTML.replace(/\t/g, "")
            .replace(/\n/g, ""),

          ratings:
            el
              .querySelectorAll(".ratings p")[1]
              ?.innerHTML.replace(/\t/g, "")
              .replace(/\n/g, "")
              .split('<span class="glyphicon glyphicon-star"></span>').length -
            1 +
            " estrelas",

          description: el
            .querySelector(".description")
            ?.innerHTML.replace(/\t/g, "")
            .replace(/\n/g, ""),

          link:
            "https://webscraper.io" +
            el
              .querySelector(".caption")
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

    await browser.close();

    const data = infos.products.map((data) => {
      let result;

      if (data.description?.match(filter)) {
        result = data;
      }

      return result;
    });

    const removeNullData = data.filter((element) => {
      return element !== undefined;
    });

    return removeNullData;
  }
}
