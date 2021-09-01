// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

//Fetches .txt data to https://reaktor-next-js-express-js-preassignment.vercel.app/api/ruledata
export default async function getInitialProps(req, res) {
  const response = await fetch('https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt')
  res.send(await response.text());
}
