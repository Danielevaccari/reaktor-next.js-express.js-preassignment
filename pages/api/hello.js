// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const response = await fetch('https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt')
  res.send(await response.text());
}
