'use client';

export default function SupportLink({ phone, reachGoals, hideSupportPhone }) {
  return (
    <a
      href={"tel:" + phone.replace(/\D/g, '')}
      id={Number(hideSupportPhone) ? "supportPhone" : ""}
      onClick={() => {
        if (window.ym) {
            console.log(reachGoals.ym_counter) 
            console.log(reachGoals.support)
            window.ym(reachGoals.ym_counter, 'reachGoal', reachGoals.support);
        }
      }}
    >
      {phone}
    </a>
  );
}