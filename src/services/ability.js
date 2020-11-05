import { AbilityBuilder, Ability } from '@casl/ability';

function defineRulesFor(user) {
    const { can, cannot, rules } = new AbilityBuilder();

    const groups = [...user.groups].map(g => g.toLowerCase());
    for (const group of groups) {
        switch (group) {
            case 'admin':
                can('manage', 'all');
                break;
            case 'student':
                cannot('manage', 'all');
                break;

            default:
                break;
        }
    }

    return rules;
}

function defineAbilitiesFor(user){
    return new Ability(defineRulesFor(user));
}

export { defineRulesFor, defineAbilitiesFor };