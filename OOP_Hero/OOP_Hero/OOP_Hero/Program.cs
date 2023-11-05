namespace OOP_Hero;

class Program
{
    static void Main()
    {
        List<Hero> heroes = new List<Hero>
        {
            new FireHero(),
            new WaterHero(),
            new FireHero(),
            new WaterHero(),
            new FireHero(),
            new WaterHero(),
            new FireHero(),
            new WaterHero(),
            new WaterHero(),
            new WaterHero(),
            new FireHero(),
            new FireHero(),
            new FireHero(),
            new WaterHero(),

        };


        Console.WriteLine("Hero before battle");
        Hero.DisplayAllHerosStatus(heroes);

        Console.WriteLine("--------------------------------\n\n\n");

        Console.WriteLine("Start Battle");
        // Simulate battle

        while (heroes.Count(h => !h.IsDead()) > 1)
        {
            for (int i = 0; i < heroes.Count; i++)
            {
                var hero = heroes[i];

                if (hero.IsDead())
                {
                    Console.WriteLine($"{hero.GetType().Name} {i} is Dead \n");
                    continue;
                }

                var targets = new List<Hero>(heroes.Where(h => h.Health > 0 && h != hero));

                Random random = new Random();
                int skillIndex = random.Next(4);

                switch (skillIndex)
                {
                    case 0:
                        Console.WriteLine($"{hero.GetType().Name} {i} attack used Q");
                        hero.Q(targets);
                        break;
                    case 1:
                        Console.WriteLine($"{hero.GetType().Name} {i} attack used W");
                        hero.W(targets);
                        break;
                    case 2:
                        Console.WriteLine($"{hero.GetType().Name} {i} attack used E");
                        hero.E(targets);
                        break;
                    case 3:
                        Console.WriteLine($"{hero.GetType().Name} {i} attack used R");
                        hero.R(targets);
                        break;
                }



                Hero.DisplayAllHerosStatus(heroes);
                Console.WriteLine();

                if (heroes.Count(h => !h.IsDead()) == 1)
                {
                    break;
                }
            }
        }

        Console.WriteLine("End Battle");
        Console.WriteLine("--------------------------------\n\n\n");
        Console.WriteLine("Hero after battle");
        Hero.DisplayAllHerosStatus(heroes);


    }
}