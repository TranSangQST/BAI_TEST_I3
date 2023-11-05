using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_Hero
{
    class WaterHero : Hero
    {
        public WaterHero() : base(80, 20) { }

        public override void Q(List<Hero> targets)
        {
            int decreaseMama = 3;
            if (mana >= decreaseMama)
            {
                foreach (var target in targets)
                {
                    target.Health -= 20;
                }
                mana -= decreaseMama;
            }
            else
            {
                this.DisplayFailSkill(decreaseMama, "Q");
            }
        }

        public override void W(List<Hero> targets)
        {
            int decreaseMama = 3;

            if (mana >= decreaseMama)
            {
                for (int i = 0; i < targets.Count; i++)
                {
                    if (i < 2)
                    {
                        targets[i].Health -= 10;
                    }
                    else
                    {
                        targets[i].Health -= 5;
                    }
                }
                mana -= decreaseMama;
            }
            else
            {
                this.DisplayFailSkill(decreaseMama, "W");
            }

        }

        public override void E(List<Hero> targets)
        {

            health += 20;
            mana += 5;

        }

        public override void R(List<Hero> targets)
        {
            int decreaseMama = 15;
            if (mana >= decreaseMama)
            {
                foreach (var target in targets)
                {
                    target.Health -= 50;
                }
                health += 5;
                mana -= decreaseMama;
            }
            else
            {
                this.DisplayFailSkill(decreaseMama, "R");
            }
        }
    }

}
