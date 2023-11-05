using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_Hero
{
    class FireHero : Hero
    {
        public FireHero() : base(100, 20) { }

        public override void Q(List<Hero> targets)
        {
            int decreaseMama = 2;
            if (mana >= decreaseMama)
            {
                foreach (var target in targets)
                {
                    target.Health -= 15;
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

            health += 10;
            mana += 10;

        }

        public override void E(List<Hero> targets)
        {
            int decreaseMama = 5;
            if (mana >= decreaseMama)
            {
                if (targets.Count > 0)
                {
                    targets[0].Health -= 30;
                }
                mana -= decreaseMama;
            }
            else
            {
                this.DisplayFailSkill(decreaseMama, "E");
            }
        }

        public override void R(List<Hero> targets)
        {
            int decreaseMama = 10;
            if (mana >= decreaseMama)
            {
                foreach (var target in targets)
                {
                    target.Health -= 30;
                }
                mana -= decreaseMama;
            }
            else
            {
                this.DisplayFailSkill(decreaseMama, "R");
            }
        }
    }

}
