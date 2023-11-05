namespace OOP_Hero;

class Program
{
    static List<Hero> GenerateRandomHeroes(int n)
    {
        List<Hero> heroes = new List<Hero>();
        Random random = new Random();

        for (int i = 0; i < n; i++)
        {
            // Generate a random number (0 or 1) to decide whether to create a FireHero or WaterHero
            int randomHeroType = random.Next(2);
            if (randomHeroType == 0)
            {
                heroes.Add(new FireHero());
            }
            else
            {
                heroes.Add(new WaterHero());
            }
        }

        return heroes;
    }
    static void Main()
    {
        Console.Write("Enter the number of heroes (n): ");
        int n = int.Parse(Console.ReadLine());

        List<Hero> heroes = GenerateRandomHeroes(n);

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