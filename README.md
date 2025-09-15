# nextjs-intdev-services-auth-payments

This repository represents all you need to build a service on api.internet.dev that supports authentication, payments, and user accounts. Over time we will keep making easier and easier to build applications on top of our infrastructure.

### Setup (MacOS)

Start by cloning the repository, or by clicking on **Use this template** above.

You will have wanted to setup your development environment by following steps [here](https://github.com/internet-development/nextjs-sass-starter/issues/3).

You will need to create a `.env` with these values

```sh
API_AES_KEY=xxxxx
API_IV_KEY=xxxxx
```

You will need to ask someone on the [INTDEV](https://company.internet.dev) team for the correct ones.

Then run the server

```sh
npm install
npm run dev
```

Go to `http://localhost:10000` in your browser of choice.

Enjoy! The template uses `10000` as our `port` for more compatibility with [Render.com](https://render.com)

### Contact

If you have questions ping me on Twitter, [@wwwjim](https://www.twitter.com/wwwjim). Or you can ping [@internetxstudio](https://x.com/internetxstudio).
