const timePara = new Date();
document.querySelector('.date').textContent = timePara;

const links = document.querySelectorAll('.links a');

links.forEach((link) => {
  link.addEventListener('click', () => {
    if (link.classList.contains('active')) return;

    links.forEach((a) => {
      a.classList.remove('active');
    });

    link.classList.add('active');

    document.querySelector('.flex').classList.remove('flex');

    document.querySelector(`.${link.id}`).classList.add('flex');
  });
});
