class Elevator {
    constructor() {
        this.$elevator = $('.elevator');
        this.floorQtd = 3;
        this.initEvents();
        this.submitEvent();
    }

    initEvents() {
        const urlParams = new URLSearchParams(window.location.search);
        const floor = urlParams.get('floor');

        if (floor) {
            this.$elevator.addClass(`floor-${floor}`)
        }
    }

    openDoor() {
        if (this.isOpenDoor()) {
            return true;
        } else {
            this.$elevator.find('#ports').removeClass('close-elevator').addClass('open-elevator').css({
                '-webkit-transition-duration': '4s'
            });
            this.$elevator.find('#port-1').removeClass('port-left-closed').addClass('port-left-open').css({
                '-webkit-transition-duration': '2s'
            });
            this.$elevator.find('#port-2').removeClass('port-right-closed').addClass('port-right-open').css({
                '-webkit-transition-duration': '2s'
            });
        }
    }

    closeDoor() {
        return new Promise((resolve, reject) => {
            if (this.isOpenDoor()) {
                this.$elevator.find('#ports').removeClass('open-elevator').addClass('close-elevator').css({
                    '-webkit-transition-duration': '1.5s'
                });
                this.$elevator.find('#port-1').removeClass('port-left-open').addClass('port-left-closed').css({
                    '-webkit-transition-duration': '2s'
                });
                this.$elevator.find('#port-2').removeClass('port-right-open').addClass('port-right-closed').css({
                    '-webkit-transition-duration': '2s'
                });
    
                setTimeout(() => {
                    resolve();
                }, 2000); 
            } else {
                resolve();
            }
        });
    }

    isOpenDoor() {
        let ports = this.$elevator.find('#ports');

        return (ports.hasClass('open-elevator'));
    }

    goToFloor(number) {
        this.closeDoor().then(() => {
            new Promise((resolve, reject) => {
                this.removeFloorClasses();

                this.$elevator.addClass(`floor-${number}`).css({
                    '-webkit-transition-duration': '2s'
                });

                if (number === 0) {
                    this.$elevator.find('#num-elevator').html('T')
                } else {
                    this.$elevator.find('#num-elevator').html(number)
                }
                
                if (number === 3) {
                    this.$elevator.find('#title-elevator').html('Apresentação')
                } else if (number === 2) {
                    this.$elevator.find('#title-elevator').html('Formações')
                } else if (number === 1) {
                    this.$elevator.find('#title-elevator').html('Projetos')
                } else if (number === 0) {
                    this.$elevator.find('#title-elevator').html('Contatos')
                }

                this.$elevator.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', () => {
                    resolve();
                });
            })
        }).then(() => {
            setTimeout(() => {
                this.openDoor();
            }, 2000);

            setTimeout(() => {
                if (number === 3) {
                    window.location.href = './pages/presentation.html'
                } else if (number === 2) {
                    window.location.href = './pages/formations.html'
                } else if (number === 1) {
                    window.location.href = './pages/projects.html'
                } else if (number === 0) {
                    window.location.href = './pages/contacts.html'
                }
            }, 5000);
        });
    }

    removeFloorClasses() {
        for(let i=0; i <= this.floorQtd; i++) {
            this.$elevator.removeClass(`floor-${i}`)
        }
    }

    submitEvent() {
        $('.buttons .btn').on('click', e => {
            let btn = e.target;
            let floor = $(btn).data('floor');
            this.goToFloor(floor);
        })
    }

    backEvent() {
        $('.buttons .btn').on('click', e => {
            let btn = e.target;
            let floor = $(btn).data('floor');

            window.localStorage('floor', floor)
        })
    }
}