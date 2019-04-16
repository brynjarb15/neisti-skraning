const initalData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Leikjastjórnun | 2.5 klst' },
        'task-2': { id: 'task-2', content: 'Fjallamennska og rötun | 2.5 klst' },
        'task-3': { id: 'task-3', content: 'Leðurvinna, ull og garn | 2.5 klst' },
        'task-4': { id: 'task-4', content: 'Skrautskrift | 1 klst' },
        'task-5': { id: 'task-5', content: 'Hnífar og axir | 1 klst' },
        'task-6': { id: 'task-6', content: 'Hnútar og bindingar | 2.5 klst' },
        'task-7': { id: 'task-7', content: 'Skyndihjálp | 2.5 klst' },
        'task-8': { id: 'task-8', content: 'ÚT að borða | 2.5 klst' },
        'task-9': { id: 'task-9', content: 'GAS- prímusar og hitarar | 1 klst' },
        'task-10': { id: 'task-10', content: 'Eldmeistarinn | 2.5 klst' },
        'task-11': { id: 'task-11', content: 'Klifur og sig | 2.5 klst' },
        'task-12': { id: 'task-12', content: 'Sálræn skyndihjálp | 2.5 klst' },
        'task-13': { id: 'task-13', content: 'Canva og photoshop | 1 klst' },
        'task-14': { id: 'task-14', content: 'Forritun fyrir krakka | 1 klst' },
        'task-15': { id: 'task-15', content: 'Víkingar | 1 klst' },
        'task-16': { id: 'task-16', content: 'Geimurinn, stjörnur og stjörnumerki | 2.5 klst' },
        'task-17': { id: 'task-17', content: 'Íslenski fáninn | 1 klst' },
        'task-18': { id: 'task-18', content: 'Youtube | 1 klst' },
        'task-19': { id: 'task-19', content: 'Heimsmarkmiðin | 2.5 klst' },
        'task-20': { id: 'task-20', content: 'Spuni og leiklist | 1 klst' },
        'task-21': { id: 'task-21', content: 'Saga skátastarfs | 2.5 klst' },
        'task-22': { id: 'task-22', content: 'Flóttamannaspilið | 1 klst' },
        'task-23': { id: 'task-23', content: 'Gítar, ukulele og slagverk | 2.5 klst' },
        'task-24': { id: 'task-24', content: 'Úr glamri í geggjað djamm | 1 klst' },
        'task-25': { id: 'task-25', content: 'Kvöldvökur og varðeldastjórnun | 1 klst' },
    },
    columns: {
        'AllTasks': {
            id: 'AllTasks',
            title: 'Það sem er í boði',
            taskIds: [
                'task-1',
                'task-2',
                'task-3',
                'task-4',
                'task-5',
                'task-6',
                'task-7',
                'task-8',
                'task-9',
                'task-10',
                'task-11',
                'task-12',
                'task-13',
                'task-14',
                'task-15',
                'task-16',
                'task-17',
                'task-18',
                'task-19',
                'task-21',
                'task-22',
                'task-23',
                'task-24',
                'task-25',
            ]
        },
        'ChosenTasks': {
            id: 'ChosenTasks',
            title: 'Það sem ég vil fara í',
            taskIds: []
        }
    },
    // Facilitate reordering of the columns
    columnOrder: ['AllTasks', 'ChosenTasks']
};

export default initalData;