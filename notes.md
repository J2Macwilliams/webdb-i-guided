# Relational Database notes


## Expectations

-quick intro to relational db
-cover **using** a db
-SQLite3 as the Database Management System
    -simpler to get started
    -no need for a server
    -missing some features
    -not intended for large applications

-- sorting
select * from [products]



--descending


--controlling how many records are returned


--pagination with order by 


--adding records


--partial lookup



--updating
update products
set price = 24.99
where productId = 79;

update products
set price = 24.99, unit = 'whole cake'
where productId = 79


--deleting
delete FROM [Products]
where productId = 80