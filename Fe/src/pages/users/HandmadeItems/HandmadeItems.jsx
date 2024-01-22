import classNames from 'classnames/bind';
import styles from './HandmadeItems.module.scss';
const cx = classNames.bind(styles);

const FakeItem = [
    {
        itemId: 1,
        itemName: "Hoa giấy",
        imgUrl: "../item1.jpg",
        price: '70000',
        quantity: 10
    },
    {
        itemId: 2,
        itemName: "Móc khóa len",
        imgUrl: '../item2.jpg',
        price: '20000',
        quantity: 1
    },
    {
        itemId: 3,
        itemName: "Cặp tóc",
        imgUrl: "../item3.jpg",
        price: '10000',
        quantity: 2
    },
    {
        itemId: 4,
        itemName: "Thiệp",
        imgUrl: "../item4.jpg",
        price: '7000',
        quantity: 5
    },
    {
        itemId: 5,
        itemName: "Dây buộc tóc",
        imgUrl: "../item5.jpg",
        price: '70000',
        quantity: 4
    },
    {
        itemId: 6,
        itemName: "Túi vải",
        imgUrl: '../item6.jpg',
        price: '70000',
        quantity: 2
    }
]

const HandmadeItems = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx("cover")}>
                <img src='../tiemhand.png' alt="tiem hand"></img>
            </div>
            <div className={cx("itemList")}>
                {FakeItem.map((item) => (
                    <div key={item.itemId} className={cx("item")}>
                        <img src={item.imgUrl} alt={item.itemName} className={cx("item-image")} />
                        <h5 className={cx("item-field")}>Tên sản phẩm: {item.itemName}</h5>
                        <p className={cx("item-field")}>Số lượng: {item.quantity}</p>
                        <p className={cx("item-field")}>Giá: {item.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HandmadeItems;