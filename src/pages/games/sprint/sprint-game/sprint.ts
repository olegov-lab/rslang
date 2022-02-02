import { getWords } from '../../../../api/api';

const main = async () => {
  const words = await getWords(0, 0);

  console.log(words);
};

main();
