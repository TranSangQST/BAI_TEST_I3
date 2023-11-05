using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_Hero
{
    abstract class Hero
    {
        protected int health;
        protected int mana;

        public int Health
        {
            get { return health; }
            set { health = value; }
        }

        public int Mana
        {
            get { return mana; }
            set { mana = value; }
        }

        public Hero(int initialHealth, int initialMana)
        {
            health = initialHealth;
            mana = initialMana;
        }

        public abstract void Q(List<Hero> targets);
        public abstract void W(List<Hero> targets);
        public abstract void E(List<Hero> targets);
        public abstract void R(List<Hero> targets);

        protected void DisplayFailSkill(int needMana, string skillName)
        {

            if (needMana > this.Mana)
            {
                // Nếu needMama > mama, in ra thông báo tiếng Anh
                Console.WriteLine($"This hero have only {this.Mana} mana, can't use {skillName} ({needMana})");
            }
        }


        public Boolean IsDead()
        {
            return health <= 0;
        }

        static public void DisplayAllHerosStatus(List<Hero> heroes)
        {

            for (int i = 0; i < heroes.Count; i++)
            {
                var hero = heroes[i];
                if (hero.IsDead())
                {
                    Console.WriteLine($"{i}: {hero.GetType().Name} Health: {hero.Health}, Mana: {hero.Mana} [DEAD]");
                }
                else
                {
                    Console.WriteLine($"{i}: {hero.GetType().Name} Health: {hero.Health}, Mana: {hero.Mana}");
                }
            }
        }
    }

}
