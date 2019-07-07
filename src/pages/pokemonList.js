class PokemonList {

  constructor(core) {
    this.core = core;
  }

  async start() {
    await this.core.bot.goto('https://pokemondb.net/pokedex/all');
    // await this.core.bot.screenshot({path: 'logs/screenshot/pokemon-list.png'});

    try {

      await this.core.bot.waitForSelector('#pokedex', {timeout: 5000});
      await this.core.bot.waitForSelector('table#pokedex thead tr th', {timeout: 5000});

      const pokemonList = await this.core.bot.evaluate(() => {

        const columns = Array.from(document.querySelectorAll('table#pokedex thead tr th'), (e, index) => {
          if (index === 0) {
            return 'ID'
          }
          return e.innerText
        })

        return Array.from(document.querySelectorAll('table#pokedex tbody tr'), (e, index) =>  {
          let children = e.children;

          let childNodes = Array.from(children, (child) => {
            return child.innerText;
          })

          let data = {};
          childNodes.map((e, index) => {
            if (e.includes('\r') || e.includes('\n') || e.includes('\t')) {
              e = e.replace(/\r\n/g, "\r").replace(/\n/g, "\r").split(/\r/);
              e = e.filter((el) => el);
            }
            data[columns[index]] = e;
          });

          return data;
        })
      });

      await this.core.database.saveToJson('pokemon-list.json', pokemonList);

    } catch (e) {
      console.error('[POKEMON-LIST]', e);
    }

  }
}

module.exports = PokemonList;
