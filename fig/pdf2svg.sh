if [ -z $2 ]
then
  pdf2svg $1.pdf $1.svg
else
  if [ -d $1 ]
  then
    rm -r $1
  fi

  mkdir $1

  for i in $(seq 1 $2)
  do
    pdf2svg $1.pdf $1/$i.svg $i
  done
fi