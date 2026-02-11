
document.addEventListener("DOMContentLoaded", function () {

    function addClass(el, class_name) {
        el.classList.add(class_name);
    }
    function removeClass(el, class_name) {
        el.classList.remove(class_name);
    }
    function toggleClass(el, class_name) {
        el.classList.toggle(class_name);
    }

    function removeAllClasses(class_name) {
        let classes = document.querySelectorAll(`.${class_name}`);
        classes.forEach(el => {
            removeClass(el, class_name);
        });
    }

    let loadSvg = document.getElementById('load-svg');

    function addLoad() {
        addClass(loadSvg, 'open');
    }
    function removeLoad() {
        removeClass(loadSvg, 'open');
    }

    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');

    if (document.querySelector('.header-search')) {
        var searchTop = document.querySelector('.header-search');
        var btnCloseSearch = searchTop.querySelector('.close_svg');
        var inputSearch = searchTop.querySelector('#title-search-input');
        var btnOpenSearch = document.querySelectorAll('.header-search-open-btn');

        btnCloseSearch.addEventListener('click', () => {
            removeClass(searchTop, "open");
        })

        btnOpenSearch.forEach(btn => {
            btn.addEventListener('click', () => {
                addClass(searchTop, "open");
                inputSearch.focus();
            })
        })
    }

    if (header.querySelector('.header-overlay')) {
        const headerOverlay = header.querySelector('.header-overlay');
        headerOverlay.addEventListener('click', () => {
            removeAllClasses("open");
            removeAllClasses("no-scroll");
        })
    }

    if (document.querySelector('.footer-menu')) {
        const footerMenu = document.querySelectorAll('.footer-menu');
        footerMenu.forEach(menu => {
            let footerMenuTitle = menu.querySelector('.footer-menu-title');
            if (footerMenuTitle) {
                footerMenuTitle.addEventListener('click', () => {
                    toggleClass(menu, "opened");
                })
            }
        });
    }

    if (document.querySelector('[data-max-symbols-item]')) {
        const maxSymbolsItems = document.querySelectorAll('[data-max-symbols-item]');
        
        // Функция для определения максимального количества символов в зависимости от ширины экрана
        function getMaxSymbols(textElement) {
            const windowWidth = window.innerWidth;
            const hasMobAttr = textElement.hasAttribute('data-max-symbols-mob');
            
            // Если ширина экрана <= 500px и есть атрибут data-max-symbols-mob, используем его
            if (windowWidth <= 500 && hasMobAttr) {
                return parseInt(textElement.getAttribute('data-max-symbols-mob')) || 0;
            }
            
            // Иначе используем обычный data-max-symbols
            return parseInt(textElement.getAttribute('data-max-symbols')) || 0;
        }
        
        maxSymbolsItems.forEach(item => {
            const textElement = item.querySelector('[data-max-symbols]');
            const btnElement = item.querySelector('[data-max-symbols-btn]');
            
            if (!textElement || !btnElement) return;
            
            const maxSymbols = getMaxSymbols(textElement);
            const fullText = textElement.textContent.trim();
            const textLength = fullText.length;
            
            // Сохраняем полный текст в data-атрибут
            textElement.setAttribute('data-full-text', fullText);
            
            // Если текст длиннее максимального количества символов
            if (textLength > maxSymbols) {
                // Обрезаем текст и добавляем троеточие
                const truncatedText = fullText.substring(0, maxSymbols) + '...';
                textElement.textContent = truncatedText;
                
                // Сохраняем обрезанный текст
                textElement.setAttribute('data-truncated-text', truncatedText);
                
                // Показываем кнопку
                btnElement.style.display = 'block';
                
                // Сохраняем исходный текст кнопки
                const originalBtnText = btnElement.textContent.trim();
                btnElement.setAttribute('data-original-btn-text', originalBtnText);
                
                // Флаг для отслеживания состояния (false = обрезан, true = полный)
                let isExpanded = false;
                
                // Обработчик клика на кнопку
                btnElement.addEventListener('click', () => {
                    if (!isExpanded) {
                        // Показываем полный текст
                        textElement.textContent = fullText;
                        isExpanded = true;
                        
                        // Меняем текст кнопки, если есть data-max-symbols-btn-text
                        const btnText = btnElement.getAttribute('data-max-symbols-btn-text');
                        if (btnText) {
                            btnElement.textContent = btnText;
                        }
                    } else {
                        // Возвращаем обрезанный текст
                        textElement.textContent = truncatedText;
                        isExpanded = false;
                        
                        // Возвращаем исходный текст кнопки
                        const originalText = btnElement.getAttribute('data-original-btn-text');
                        if (originalText) {
                            btnElement.textContent = originalText;
                        }
                    }
                });
            }
        });
    }

    if (document.querySelector('a[href^="#"]')) {
        const headerOffset = header ? header.offsetHeight : 0;

        // Находим все ссылки с якорями внутри текущей страницы
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(link => {
            const href = link.getAttribute('href');

            // Пропускаем пустые якоря (#) и внешние ссылки
            if (href === '#' || href.length <= 1) return;

            const targetId = href.substring(1); // убираем '#'
            const targetElement = document.getElementById(targetId);

            // Если целевой элемент существует — навешиваем обработчик
            if (targetElement) {
                link.addEventListener('click', function (e) {
                    e.preventDefault();

                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset - 40;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                });
            }
        });
    }

    if (document.querySelector('header')) {
        const headerBot = document.querySelector('header');

        if (!headerBot || !main) return;

        main.style.marginTop = `${headerBot.offsetHeight}px`;

        // Сохраняем исходную позицию элемента
        let originalHeaderTop = headerBot.offsetTop;

        function handleScroll() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            // Если прокрутили до верха страницы
            if (scrollTop === 0) {
                headerBot.classList.remove('fixed'); // Удаляем класс fixed
                // main.style.paddingTop = '0'; // Сбрасываем padding-top
            }
            // Если прокрутили ниже исходной позиции header
            else if (scrollTop >= originalHeaderTop) {
                headerBot.classList.add('fixed'); // Добавляем класс fixed
                // main.style.paddingTop = `${headerBot.offsetHeight}px`; // Устанавливаем padding-top
            }
        }

        // Обработчик изменения размера окна
        function handleResize() {
            // Пересчитываем исходную позицию при изменении размера окна
            originalHeaderTop = headerBot.offsetTop;
            handleScroll(); // Вызываем handleScroll для корректировки состояния
        }

        // Добавляем обработчики событий
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        // Убедимся, что скрипт выполняется после полной загрузки DOM
        document.addEventListener('DOMContentLoaded', () => {
            // Пересчитываем originalHeaderTop после загрузки DOM
            originalHeaderTop = headerBot.offsetTop;
            handleScroll(); // Вызываем handleScroll для корректировки состояния
        });
    }

    if (document.querySelector('.footer-check-height-cont')) {
        const footerCheckHeightCont = document.querySelectorAll('.footer-check-height-cont');
        footerCheckHeightCont.forEach((el) => {
            const footerCheckHeight = el.querySelectorAll('.footer-check-height');
            footerCheckHeight.forEach((element) => {
                const elementHeight = element.offsetHeight;
                if (elementHeight > 485) {
                    element.classList.add('overflow-hidden-bottom');
                    let dataId = element.getAttribute('data-id');
                    let btn = el.querySelector(`[data-id="${dataId}-footer-menu"]`);
                    if (btn) {
                        removeClass(btn, "invise");
                        btn.addEventListener('click', () => {
                            toggleClass(element, "opened");
                            toggleClass(btn, "opened");
                        })
                    }

                }
            });
        });
    }

    if (document.querySelector('.footer-menu_cont_mob')) {
        const footerMenuContMob = document.querySelectorAll('.footer-menu_cont_mob');
        footerMenuContMob.forEach((el) => {
            const footerTitle = el.querySelector('.h3');
            footerTitle.addEventListener('click', () => {
                toggleClass(el, "opened");
            })
        });
    }

    if (document.querySelector('.header-mob-menu-btn-open')) {
        const headerMobMenuBtsnOpen = document.querySelectorAll('.header-mob-menu-btn-open');
        headerMobMenuBtsnOpen.forEach(btn => {
            btn.addEventListener('click', () => {
                addClass(header, "open");
            })
        });
    }

    if (document.querySelector('.header-menu-close')) {
        const headerMenuClose = document.querySelectorAll('.header-menu-close');
        headerMenuClose.forEach(btn => {
            btn.addEventListener('click', () => {
                removeClass(header, "open");
            })
        });
    }

    if (document.querySelector('.header-mob-hidden-container-for-copy .header-menu')) {
        const headerMobHiddenContainerForCopy = document.querySelector('.header-mob-hidden-container-for-copy');
        const headerMenu = headerMobHiddenContainerForCopy.querySelector('.header-mob-hidden-container-for-copy .header-menu');
        const drop_1 = headerMenu.querySelectorAll('.drop_1');
        const headerMenuBack = headerMenu.querySelectorAll('.header-menu-back');

        if (document.querySelector('.header-menu-close')) {
            const headerMenuClose = document.querySelectorAll('.header-menu-close');
            headerMenuClose.forEach(btn => {
                btn.addEventListener('click', () => {
                    removeAllClasses("open");
                    removeAllClasses("no-scroll");
                })
            });
        }

        headerMenuBack.forEach(element => {
            element.addEventListener('click', () => {
                removeClass(element.closest('.open'), "open");
                removeClass(element.closest('.no-scroll'), "no-scroll");
            })
        });

        drop_1.forEach(drop1 => {
            let cont_1 = drop1.querySelector('.cont_1');
            let drop_2 = drop1.querySelectorAll('.drop_2');

            cont_1.addEventListener('click', (e) => {
                e.preventDefault();
                addClass(drop1, "open");
                addClass(headerMobHiddenContainerForCopy, "no-scroll");
            })
            drop_2.forEach(drop2 => {
                let cont_2 = drop2.querySelector('.cont_2');

                if (cont_2) {
                    let cont_header_menu_level_2_cont = drop1.querySelector('.header-menu-level-2-cont');
                    let drop_3 = drop2.querySelectorAll('.drop_3');
                    cont_2.addEventListener('click', (e) => {
                        e.preventDefault();
                        addClass(drop2, "open");
                        addClass(cont_header_menu_level_2_cont, "no-scroll");
                    })

                    drop_3.forEach(drop3 => {
                        let cont_3 = drop3.querySelector('.cont_3');
                        if (cont_3) {
                            let cont_header_menu_level_3_cont = drop2.querySelector('.header-menu-level-3-cont');
                            cont_3.addEventListener('click', (e) => {
                                e.preventDefault();
                                addClass(drop3, "open");
                                addClass(cont_header_menu_level_3_cont, "no-scroll");
                            })
                        }

                    });
                }
            });
        });
    }

    if (document.querySelector('[data-accordion-item]')) {
        const accordionItems = document.querySelectorAll('[data-accordion-item]');
        accordionItems.forEach(item => {
            const toggle = item.querySelector('[data-accordion-toggle]');
            const content = item.querySelector('[data-accordion-content]');

            if (!toggle || !content) return;

            // Обработчик клика на toggle
            toggle.addEventListener('click', () => {
                const isActive = content.classList.contains('active');

                if (isActive) {
                    // Закрываем
                    removeClass(content, 'active');
                    removeClass(toggle, 'active');
                    removeClass(item, 'active');
                } else {
                    // Открываем текущий
                    addClass(content, 'active');
                    addClass(toggle, 'active');
                    addClass(item, 'active');
                }
            });
        });
    }

    // if (document.querySelector('[data-tabs-content]')) {
    //     const tabsContent = document.querySelectorAll('[data-tabs-content]');
    //     tabsContent.forEach(content => {
    //         const tabsContainer = content.querySelector('[data-tabs]');
    //         const tabsItems = content.querySelectorAll('[data-tabs-item]');
    //         const tabsContentItems = content.querySelectorAll('[data-tabs-content-item]');

    //         // Инициализация: первому табу и первому контенту добавляем active, остальным удаляем
    //         tabsItems.forEach((item, index) => {
    //             if (index === 0) {
    //                 item.classList.add('active');
    //             } else {
    //                 item.classList.remove('active');
    //             }
    //         });

    //         tabsContentItems.forEach((item, index) => {
    //             if (index === 0) {
    //                 item.classList.add('active');
    //             } else {
    //                 item.classList.remove('active');
    //             }
    //         });

    //         // Обработка кликов на табы
    //         tabsItems.forEach(tab => {
    //             tab.addEventListener('click', () => {
    //                 const tabId = tab.getAttribute('data-tabs-item');

    //                 // У всех табов убираем active
    //                 tabsItems.forEach(item => {
    //                     item.classList.remove('active');
    //                 });

    //                 // У всего контента убираем active
    //                 tabsContentItems.forEach(item => {
    //                     item.classList.remove('active');
    //                 });

    //                 // Добавляем active соответствующему табу и контенту
    //                 tab.classList.add('active');
    //                 const correspondingContent = content.querySelector(`[data-tabs-content-item="${tabId}"]`);
    //                 if (correspondingContent) {
    //                     correspondingContent.classList.add('active');
    //                 }
    //             });
    //         });
    //     });
    // }

    // if (document.querySelector('[data-btn-class]')) {
    //     const btnClass = document.querySelectorAll('[data-btn-class]');

    //     btnClass.forEach(btn => {
    //         btn.addEventListener('click', () => {
    //             // Получаем ID целевых элементов
    //             const elId = btn.getAttribute('data-btn-el-id');
    //             if (!elId) return;

    //             // Находим все элементы с data-id равным elId
    //             const targetElements = document.querySelectorAll(`[data-id="${elId}"]`);
    //             if (targetElements.length === 0) return;

    //             // Проверяем тип операции и класс
    //             const toggleClassName = btn.getAttribute('data-btn-toggle');
    //             const addClassName = btn.getAttribute('data-btn-add');
    //             const removeClassName = btn.getAttribute('data-btn-remove');

    //             targetElements.forEach(targetEl => {
    //                 if (toggleClassName) {
    //                     toggleClass(targetEl, toggleClassName);
    //                 } else if (addClassName) {
    //                     addClass(targetEl, addClassName);
    //                 } else if (removeClassName) {
    //                     removeClass(targetEl, removeClassName);
    //                 }
    //             });
    //         });
    //     });
    // }

    if (document.querySelector('.header-search')) {
        var searchTop = document.querySelector('.header-search');
        var inputSearch = searchTop.querySelector('#title-search-input');
        var headerTopContainer = document.querySelector('.header-top-container');
        var dataSearchFocus = document.querySelector('[data-search-focus]');

        if (dataSearchFocus) {
            dataSearchFocus.addEventListener('click', (e) => {
                if (!searchTop.classList.contains('focus')) {
                    if (containsClass(header, 'open')) {
                        removeClass(header, 'open');
                        setTimeout(() => {
                            removeClass(header, 'open');
                            addClass(searchTop, 'focus');
                            addClass(dataSearchFocus, 'active');
                            inputSearch.focus();
                            return;
                        }, 500);
                    } else {
                        removeClass(header, 'open');
                        addClass(searchTop, 'focus');
                        addClass(dataSearchFocus, 'active');
                        inputSearch.focus();
                        return;
                    }
                }
            });
        }

        inputSearch.addEventListener('focus', () => {
            addClass(searchTop, 'focus');
            if (dataSearchFocus) {
                addClass(dataSearchFocus, 'active');
            }
        })

        inputSearch.addEventListener('blur', (e) => {
            setTimeout(() => {
                if (e.target.closest('[data-search-focus]')) {
                    return;
                }
                if (dataSearchFocus) {
                    removeClass(dataSearchFocus, 'active');
                }
                removeClass(searchTop, 'focus');
            }, 200);

        })
    }

    if (document.querySelector('[data-href]')) {
        const data_href = document.querySelectorAll('[data-href]');

        data_href.forEach(element => {

            element.addEventListener('click', (e) => {

                if (e.target.getAttribute('data-popup-open')) {
                    return;
                }
                if (e.target.closest('.header-menu')) {
                    return;
                }

                if (e.target.tagName == 'A') {
                    return;
                }

                window.location = element.getAttribute('data-href');
            })

            element.addEventListener('mousedown', (e) => {
                if (e.button === 1) {
                    e.preventDefault();
                }
            })

            element.addEventListener('auxclick', (e) => {
                if (e.button !== 1) return;

                if (e.target.getAttribute('data-popup-open')) {
                    return;
                }
                if (e.target.closest('.header-menu')) {
                    return;
                }
                if (e.target.tagName == 'A') {
                    return;
                }

                e.preventDefault();
                window.open(element.getAttribute('data-href'), '_blank');
            })
        });
    }

    if (document.querySelector('.checkbox')) {
        const checkboxs = document.querySelectorAll('.checkbox');

        checkboxs.forEach(el => {
            let checkBoxBtn = el.querySelector('.check-box-btn');

            checkBoxBtn.addEventListener('click', () => {
                if (checkBoxBtn.getAttribute('data-toggle') == 'y') {
                    toggleClass(el, 'checked');
                } else {
                    addClass(el, 'checked');
                    removeClass(el, 'err');
                }
            })
        });
    }

    if (document.querySelector('form')) {
        var overlay = document.querySelector('.overlay');
        var popupCheck = document.querySelector('.popupCheck')
        var popupCheckCloseBtn = popupCheck.querySelector('.close-btn');

        popupCheckCloseBtn.addEventListener('click', () => {
            removeClass(overlay, 'open');
            removeClass(popupCheck, 'open');
        })
        overlay.addEventListener('click', () => {
            document.querySelectorAll('.open').forEach(el => {
                removeClass(el, 'open');
            })
        })

        // if (document.querySelector('.btn_pop')) {
        //     const btnPopAdd = document.querySelectorAll('.btn_pop')

        //     btnPopAdd.forEach(element => {
        //         element.addEventListener('click', () => {
        //             addClass(overlay, 'open');
        //         })
        //     });
        // }

    }

    if (document.querySelector('[data-popup-open]')) {
        let popupOpenBtns = document.querySelectorAll('[data-popup-open]');

        popupOpenBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                let btnDataId = btn.getAttribute('data-popup-open');

                let dataPopupServiceName = btn.getAttribute('data-popup-service-name');

                let dataPopupStockName = btn.getAttribute('data-popup-stock-name');

                let dataPopupServiceLink = btn.getAttribute('data-popup-service-link');

                let popup = document.getElementById(`${btnDataId}`);
                if (popup) {

                    let popupForm = popup.querySelector("form");

                    if (popupForm) {

                        let serviceLinkInput = popupForm.querySelector('input[name="service-link"]');
                        if (serviceLinkInput) {
                            popupForm.removeChild(serviceLinkInput);
                        }

                        let serviceNameInput = popupForm.querySelector('input[name="service-name"]');
                        if (serviceNameInput) {
                            popupForm.removeChild(serviceNameInput);
                        }

                        let stockNameInput = popupForm.querySelector('input[name="stock-name"]');
                        if (stockNameInput) {
                            popupForm.removeChild(stockNameInput);
                        }

                        if (dataPopupStockName) {
                            let stockNameInput = document.createElement("input");
                            stockNameInput.type = "hidden";
                            stockNameInput.name = "stock-name";
                            stockNameInput.value = dataPopupStockName;
                            popupForm.appendChild(stockNameInput);

                        }

                        if (dataPopupServiceName) {
                            let serviceNameInput = document.createElement("input");
                            serviceNameInput.type = "hidden";
                            serviceNameInput.name = "service-name";
                            serviceNameInput.value = dataPopupServiceName;
                            popupForm.appendChild(serviceNameInput);

                        }

                        if (dataPopupServiceLink) {
                            let serviceLinkInput = document.createElement("input");
                            serviceLinkInput.type = "hidden";
                            serviceLinkInput.name = "service-link";
                            serviceLinkInput.value = dataPopupServiceLink;
                            popupForm.appendChild(serviceLinkInput);
                        }

                    }

                    addClass(overlay, 'open');
                    addClass(popup, 'open');
                } else {
                    console.error(`Попап с ID: ${btnDataId} не найден`);
                }
            })
        });
    }

    if (document.querySelector('.form-all')) {
        const formSect = document.querySelectorAll(".form-all");
        const titlePopupCheck = popupCheck.querySelector('h2');

        let widgetId;

        function handleCaptcha(btn, input) {

            if (!window.smartCaptcha) {
                console.error("SmartCaptcha не загружен.");
                return;
            }

            widgetId = window.smartCaptcha.render(`captcha-container`, {
                sitekey: 'YANDEX_KEY', // Замените на ваш Client Key
                invisible: true, // Указываем, что капча невидимая
                callback: (token) => {
                    input.value = token;
                    btn.click();
                },
            });
        }

        formSect.forEach(formSect => {

            let form = formSect.querySelector("form");
            let formBtn = formSect.querySelector("[type='submit']");
            let nameInp = formSect.querySelector("[name='name']");
            let phoneInp = formSect.querySelector("[name='phone']");
            let emailInp = formSect.querySelector("[name='email']");

            let checkBoxBtn = formSect.querySelector("[data-processing]");

            if (checkBoxBtn) {
                // addClass(checkBoxBtn, 'checked');
            }

            if (formSect.classList.contains('popupForm')) {
                let closePopupBtn = formSect.querySelector('.close-btn');

                closePopupBtn.addEventListener('click', () => {
                    removeClass(overlay, 'open');
                    removeClass(formSect, 'open');
                })

                formSect.addEventListener('click', (e) => {
                    if (e.target.classList.contains('popupForm')) {
                        overlay.click();
                    }
                })
            }

            function allCheck() {
                if (checkInputsValid(nameInp, 1) && checkInputsValid(phoneInp, 17) && checkCheckBox(checkBoxBtn)) {
                    return true;
                } else {
                    return false;
                }
            }

            function checkCheckBox(checkbox) {
                if (checkbox.classList.contains('checked')) {
                    removeClass(checkbox, 'err');
                    return true;
                } else {
                    addClass(checkbox, 'err');
                    return false;
                }
            }

            window.addEventListener("DOMContentLoaded", function () {
                [].forEach.call(document.querySelectorAll("[name='phone']"), function (input) {
                    var keyCode;
                    function mask(event) {
                        event.keyCode && (keyCode = event.keyCode);
                        var pos = this.selectionStart;
                        if (pos < 3) event.preventDefault();
                        var matrix = "+7 (___) ___ ____",
                            i = 0,
                            def = matrix.replace(/\D/g, ""),
                            val = this.value.replace(/\D/g, ""),
                            new_value = matrix.replace(/[_\d]/g, function (a) {
                                return i < val.length ? val.charAt(i++) : a
                            });
                        i = new_value.indexOf("_");
                        if (i != -1) {
                            i < 5 && (i = 3);
                            new_value = new_value.slice(0, i)
                        }
                        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                            function (a) {
                                return "\\d{1," + a.length + "}"
                            }).replace(/[+()]/g, "\\$&");
                        reg = new RegExp("^" + reg + "$");
                        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                            this.value = new_value;
                        }
                        if (event.type == "blur" && this.value.length < 5) {
                            this.value = "";
                        }
                    }

                    input.addEventListener("input", mask, false);
                    input.addEventListener("focus", mask, false);
                    input.addEventListener("blur", mask, false);
                    input.addEventListener("keydown", mask, false);

                });
            });

            $(function () {
                $(nameInp).keyup(function () {
                    sergey = $(this).val().toLowerCase(), spout = 'http://,https,url,.ru,.com,.net,.tk,php,.ucoz,www,.ua,.tv,.info,.org,.su,.ру,.су,.ком,.инфо,//'.split(',');
                    for (litvinov = 0; litvinov < spout.length; litvinov++) {
                        if (sergey.search(spout[litvinov]) != -1) {
                            $(this).val(sergey.replace(spout[litvinov], '[Запрещено]'));
                            return true;
                        }
                    }
                });
            });

            function checkInputsValid(input, num) {
                if (input.value.length < num) {
                    input.parentNode.classList.add("err");
                    formBtn.disabled = true;
                    return false;
                } else {
                    input.parentNode.classList.remove("err");

                    return true;
                }
            }

            let check;

            function addLisInput(input, num) {
                checkInputsValid(input, num);
                input.addEventListener('input', check = () => {
                    checkInputsValid(input, num);
                    if (allCheck()) {
                        formBtn.disabled = false;
                    } else {
                        formBtn.disabled = true;
                    }
                })
            }

            function removeLisInput(input) {
                input.removeEventListener('input', check)
            }

            let check_4;

            function addLisCheckBox(checkbox) {
                checkCheckBox(checkbox);
                checkbox.addEventListener('click', check_4 = () => {
                    checkCheckBox(checkbox);
                    if (allCheck()) {
                        formBtn.disabled = false;
                    } else {
                        formBtn.disabled = true;
                    }
                })
            }

            function removeLisCheckBox(checkbox) {
                checkbox.removeEventListener('click', check_4);
            }

            function clearInputs(input) {
                removeLisInput(input);

                // if (checkBoxBtn) {
                //     removeClass(checkBoxBtn, 'err');
                //     removeClass(checkBoxBtn, 'checked');
                // }

                input.value = '';
            }

            function handleTextGood() {
                // window.smartCaptcha.destroy(widgetId);
                addLoad();
                setTimeout(() => {
                    removeLoad();
                    titlePopupCheck.textContent = 'Спасибо за заявку! Скоро мы вам перезвоним!';
                    removeClass(formSect, 'open');
                    addClass(overlay, 'open')
                    addClass(popupCheck, 'open')
                    if (nameInp) {
                        clearInputs(nameInp);
                    }
                    clearInputs(phoneInp);
                    if (emailInp) {
                        clearInputs(emailInp);
                    }

                    // clearInputs(captchaInp);
                    setTimeout(() => {
                        document.querySelectorAll('.open').forEach(el => {
                            removeClass(el, 'open');
                        })
                    }, 3500);
                }, 1000);

            }

            function handleTextNoGood() {
                removeLoad();
                titlePopupCheck.textContent = 'Повторите попытку позже';
                removeClass(formSect, 'open');
                addClass(popupCheck, 'open');
                setTimeout(() => {
                    if (overlay.classList.contains('open')) {
                        addClass(formSect, 'open');
                    }
                }, 3500);
            }

            function handleTextError() {
                removeLoad();
                titlePopupCheck.textContent = 'Что-то пошло не так';
                removeClass(formSect, 'open');
                addClass(popupCheck, 'open');
                setTimeout(() => {
                    if (overlay.classList.contains('open')) {
                        addClass(formSect, 'open');
                    }
                }, 3500);
            }

            // Создаем скрытое поле для токена капчи
            let captchaTokenInput = document.createElement('input');
            captchaTokenInput.type = 'hidden';
            captchaTokenInput.name = `captcha_token`;

            // Добавляем скрытое поле в начало текущей формы
            form.prepend(captchaTokenInput);

            let captchaInp = form.querySelector(`[name="captcha_token"]`);

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                removeLisInput(phoneInp);

                if (nameInp) {
                    removeLisInput(nameInp);
                    addLisInput(nameInp, 1);
                }
                addLisInput(phoneInp, 17);

                if (checkBoxBtn) {
                    removeLisCheckBox(checkBoxBtn);
                    addLisCheckBox(checkBoxBtn);
                }

                if (allCheck()) {
                    // if (!captchaInp.value) {
                    //     handleCaptcha(formBtn, captchaInp);
                    //     window.smartCaptcha.execute(widgetId);
                    //     // setTimeout(() => {
                    //     //     removeLoad();
                    //     // }, 10000);
                    //     return;
                    // } else {
                    addLoad();

                    let formData = new FormData(form);
                    formData.append('captcha_token', captchaInp.value);

                    // fetch('/local/templates/main/tools/send.php', {
                    //     method: 'POST',
                    //     body: formData,
                    // })
                    //     .then((res) => res.json())
                    //     .then(result => {
                    //         if (result.success) {
                    //             handleTextGood();
                    //         } else {
                    //             handleTextNoGood();
                    //         }
                    //     })
                    //     .catch((err) => {
                    //         handleTextError();
                    //         console.log(err);
                    //     });
                    handleTextGood();
                }

                // }

            })
        });
    }

    if (document.querySelector('.sogl')) {
        const sogl = document.querySelector('.sogl');
        const soglBtn = sogl.querySelector('.button');

        var date = new Date();
        function getCookie(name) {
            var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }

        if (getCookie('time_open') && getCookie('click_sogl_ok')) {
            let one = date.getMinutes();
            let two = getCookie('time_open');
            if (one > two) {
                let rez = one - two;
                if (rez >= 50 || !getCookie('click_sogl_ok')) {

                    soglBtn.addEventListener('click', () => {
                        document.cookie = `click_sogl_ok=true; path=/`;
                        sogl.classList.add("invise");
                    })
                    sogl.classList.remove("invise");
                }
            } else if (one < two && getCookie('click_sogl_ok')) {
                let rez = 60 - two + one;
                if (rez >= 50 && !getCookie('click_sogl_ok')) {
                    soglBtn.addEventListener('click', () => {
                        document.cookie = `click_sogl_ok=true; path=/`;
                        sogl.classList.add("invise");
                    })
                    sogl.classList.remove("invise");
                }
            }
        } else {
            soglBtn.addEventListener('click', () => {
                document.cookie = `click_sogl_ok=true; path=/`;
                sogl.classList.add("invise");
            })
            sogl.classList.remove("invise");
            document.cookie = `time_open=${date.getMinutes()}; path=/`;
        }
    }



    window.addEventListener('click', (e) => {
        if (searchTop && !e.target.closest(".header-search")) {
            if (e.target.closest('.header-search-cont')) {
                return;
            }
            if (e.target.closest('.header-search-open-btn')) {
                return;
            }
            removeClass(searchTop, "open");
        }
        // if (e.target.id == 'open-form-popup') {
        //     if (popupForm && overlay_v2) {
        //         addClass(overlay_v2, 'open');
        //         addClass(popupForm, 'open');
        //     }
        // }
    })

    if (document.querySelector('.isAdmin')) {
        console.log('index.js finish work');
    }
});