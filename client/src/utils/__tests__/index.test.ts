import {
  ValidateTitle,
  ValidateDescription,
  ValidateEmail,
  ValidatePassword,
  ConfirmPasswordCheck,
  CheckURL,
} from '../Validation';

describe('Validation Utils', () => {
  it('Validate Name should return an error if the name is not alphanumeric', () => {
    let result = ValidateTitle('', 'Name');
    expect(result).toBe('Name must be between 4 and 30 characters');
    result = ValidateTitle(
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima sequi quod ad, libero optio vitae deleniti aperiam dolor quisquam, ab porro voluptates ipsa voluptatum, veritatis autem. Iure voluptatem libero ex et quae nostrum! Ut numquam tenetur minus sequi neque voluptatem cupiditate iure, est suscipit officia quisquam recusandae. Error, placeat maxime.',
    );
    expect(result).toBe('Name must be between 4 and 30 characters');
  });
  it('Validate Name should return an empty string if the name is between 4 and 30 characters', () => {
    const result = ValidateTitle('Priyang');
    expect(result).toBe('');
  });

  // Description Validation
  it('Validate Description should return an error if the description is less than ten or more than 400 ', () => {
    let result = ValidateDescription('');
    expect(result).toBe('Description must be between 10 and 400 characters');
    result = ValidateDescription(
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis autem suscipit, quas sapiente natus quo est. Ipsum ut nulla error sunt laboriosam quod unde officia veniam consectetur hic, necessitatibus est voluptatem dolor veritatis quae ab rerum aliquid ad consequatur officiis nihil cupiditate? Explicabo labore facere non saepe veniam quae unde quibusdam ipsum porro consequuntur quas voluptatibus illum animi voluptatum molestias dolores cum illo, esse nesciunt iste? Tenetur maiores reiciendis, laborum fuga nesciunt labore consectetur mollitia adipisci dolores deleniti laboriosam illum. Doloremque dolorum tempore recusandae excepturi nihil maxime laudantium nobis dolor, corporis fugiat officia debitis dolore id fugit consequatur explicabo assumenda, ab cupiditate dignissimos non molestiae. Explicabo voluptatum deserunt, itaque modi et similique, vel vero totam a hic error molestiae enim, natus iste molestias optio ipsum temporibus! Eveniet temporibus distinctio deserunt nobis. Fugit ea pariatur doloremque quidem voluptas culpa nam ipsum doloribus quae? Sapiente, recusandae, libero, dicta adipisci et doloribus similique architecto culpa ut fugit quae. Esse culpa deleniti ipsam ipsum nam ullam voluptas in quibusdam recusandae eum beatae quia molestiae, est reprehenderit, maiores adipisci. Ut similique aut libero consequuntur iusto officiis nemo commodi laudantium laboriosam assumenda quibusdam fugiat enim cumque laborum suscipit maxime, quidem dolore sapiente. Assumenda at, labore voluptatem ducimus quas dolorem soluta obcaecati eius, enim beatae ab vero. Harum ipsa fuga pariatur nihil maxime ullam nostrum magnam quo provident animi? Hic veritatis unde debitis nemo a provident illum repellendus mollitia sed dolores! Consectetur inventore laboriosam officiis possimus rem minus dolor, fugiat aspernatur quae itaque accusamus distinctio? Ex veritatis ut dicta quas unde omnis porro fugiat sequi hic! Dicta ex voluptatibus accusamus, provident voluptas optio aspernatur fugit porro rerum. Autem harum consequatur illum nostrum fugit ab, alias aliquid quo odit quos beatae vero ullam minima voluptate perspiciatis ea excepturi. Architecto distinctio adipisci inventore, repellat explicabo reiciendis impedit eveniet debitis cupiditate illo sequi accusantium sed eaque et vitae? Commodi laboriosam voluptas doloremque animi repellendus harum minima libero similique eligendi est odit optio, voluptates maxime rerum asperiores inventore nam architecto dolores, vel aspernatur pariatur culpa ipsa iste! Tenetur doloremque accusantium commodi labore cumque cupiditate totam facere minus expedita sapiente soluta, aliquam itaque voluptatum rerum repellendus non voluptate voluptatem excepturi doloribus! Numquam quaerat minima deleniti, dignissimos voluptate ad, tempora, voluptates id animi illo nulla similique sed neque repellat magnam vero porro. Veniam ipsa ab illo consequuntur, corporis dicta delectus magni quis deleniti vero, provident sapiente, nihil eos natus voluptatum reprehenderit atque debitis.',
    );
    expect(result).toBe('Description must be between 10 and 400 characters');
  });

  it('Validate Description should return empty string', () => {
    const result = ValidateDescription(
      'this is a loooooooooooooooooong text message',
    );
    expect(result).toBe('');
  });

  //   Email Validation
  it('Validate Email should return an error if the email is not valid', () => {
    let result = ValidateEmail('a');
    expect(result).toBe('Please enter a valid email');
    result = ValidateEmail('a@basdasd');
    expect(result).toBe('Please enter a valid email');
    result = ValidateEmail('asdasd.com');
    expect(result).toBe('Please enter a valid email');
  });
  it('Validate Email should return an empty string if the email is valid', () => {
    const result = ValidateEmail('patel@gmail.com');
    expect(result).toBe('');
  });
  //   Password Validation
  it('Validate Password should return an error if the password is not at least 6 characters', () => {
    const result = ValidatePassword('a');
    expect(result).toBe('Password must be at least 6 characters');
  });
  it('Validate Password should return an empty string if the password is at least 6 characters', () => {
    const result = ValidatePassword('asdasd');
    expect(result).toBe('');
  });
  it('Confirm Password Check should return an error if the password and confirm password do not match', () => {
    let result = ConfirmPasswordCheck('asdasd', '123123');
    expect(result).toBe('Passwords do not match');
    result = ConfirmPasswordCheck('asdasd', 'AsdasD');
    expect(result).toBe('Passwords do not match');
  });
  it('Confirm Password Check should return an empty string if the password and confirm password match', () => {
    const result = ConfirmPasswordCheck('asdasd', 'asdasd');
    expect(result).toBe('');
  });
  it('CheckURL should return false if the url is not valid', () => {
    let result = CheckURL('a');
    expect(result).toBe(false);
    result = CheckURL('a@basdasd');
    expect(result).toBe(false);
    result = CheckURL('asdasd.com');
    expect(result).toBe(false);
  });
  it('CheckURL should return true if the url is valid', () => {
    const result = CheckURL('https://google.com');
    expect(result).toBe(true);
  });
});
