import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";


type Book = {
  id: number;
  title: string;
  author: string;
};

export default function App() {
  const [books, setBooks] = useState<Book[]>([
    {
      id: 0,
      title: "",
      author: "",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost/api/books/")
      .then((response) => setBooks(response.data))
      .catch((error) => console.log(error))
  }, []);

  const [title, setTitle] = useState<string>("");
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const [author, setAuthor] = useState<string>("");
  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  const createNewBook = ():void => {
    axios
      .post("http://localhost/api/books/", {
        title: title,
        author: author,
      })
      .then((response) => {
        setBooks([...books, response.data]);
      }) 
      .then((response) => {
        setAuthor("");
        setTitle("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteBook = (id: number) => {
    axios
      .delete(`http://localhost/api/books/${id}`)
      .then((response) => {
        console.log(response);
        setBooks(books.filter((book) => book.id !== id));
      })
      .catch((error) => console.log(error));
  };

  const modifyBook = (id: number) => {
    axios
      .patch(`http://localhost/api/books/${id}`, {
      title: title,
      author: author,
      })
      .then((response) => {
        setBooks(response.data);
      })
      .then(() => {
        setAuthor("");
        setTitle("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <ul>
        {books.map((book) => (
          <>
            <li key={book.id}>
              タイトル:{book.title} 著者:{book.author}
              <button onClick={() => deleteBook(book.id)}>削除</button>
              <button onClick={() => modifyBook(book.id)}>更新</button>
            </li>
          </>
        ))}
      </ul>
      <label>
        タイトル:
        <input value={title} onChange={handleTitleChange}/>
      </label>
      <label>
        作者:
        <input value={author} onChange={handleAuthorChange}/>
      </label>
      <br />
      <button onClick={createNewBook}>作成</button>
    </>
  )

  










}