function bfIsAlphaNumeric( cfield )
{
	cfield.value = TRIM2(cfield.value);
	for ( i = 0 ; i < cfield.value.length ; i++)
	{
		var n = cfield.value.substr(i,1);
		if ( n != 'a' && n != 'b' && n != 'c' && n != 'd'
			&& n != 'e' && n != 'f' && n != 'g' && n != 'h'
			//...
			&& n != '8' && n != '9'
			&& n != '_' && n != '@' && n != '-' && n != '.' )
		{
			window.alert("Only Alphanumeric are allowed.\nPlease re-enter the value.");
			cfield.value = '';
			cfield.focus();
		}
		cfield.value =  cfield.value.toUpperCase();
	}
	return;
}